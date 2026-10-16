# ============================================================
#  serve.ps1 —— 我的工作台 本地静态预览服务器
#  纯 PowerShell 实现（TcpListener），无需安装、无需管理员、
#  不使用 Python / Node。支持 Range 请求（音频可拖动播放）。
#  用法：powershell -ExecutionPolicy Bypass -File serve.ps1 [-Port 8000] [-NoBrowser]
# ============================================================
param(
  [int]$Port = 8000,
  [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'

# 项目根目录 = 本脚本所在目录
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $root) { $root = (Get-Location).Path }
$root = (Resolve-Path -LiteralPath $root).Path

# 安全：这些目录/文件不对外提供（保护隐私，尤其是公网隧道时）
$blockedTop = @('backup', 'tools', '.git')

# MIME 类型
$mime = @{
  '.html' = 'text/html; charset=utf-8'; '.htm' = 'text/html; charset=utf-8';
  '.css'  = 'text/css; charset=utf-8';  '.js'  = 'application/javascript; charset=utf-8';
  '.mjs'  = 'application/javascript; charset=utf-8';
  '.json' = 'application/json; charset=utf-8'; '.txt' = 'text/plain; charset=utf-8';
  '.xml'  = 'application/xml; charset=utf-8'; '.svg' = 'image/svg+xml';
  '.png'  = 'image/png';  '.jpg' = 'image/jpeg'; '.jpeg' = 'image/jpeg';
  '.gif'  = 'image/gif';  '.webp' = 'image/webp'; '.ico' = 'image/x-icon';
  '.mp3'  = 'audio/mpeg'; '.wav' = 'audio/wav';  '.ogg' = 'audio/ogg'; '.m4a' = 'audio/mp4';
  '.mp4'  = 'video/mp4';  '.webm' = 'video/webm';
  '.woff' = 'font/woff';  '.woff2' = 'font/woff2'; '.ttf' = 'font/ttf';
  '.pdf'  = 'application/pdf'; '.map' = 'application/json; charset=utf-8'
}

function Test-PortFree([int]$p) {
  try {
    $t = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $p)
    $t.Start(); $t.Stop(); return $true
  } catch { return $false }
}

# 自动选择空闲端口
$tries = 0
while (-not (Test-PortFree $Port)) { $Port++; $tries++; if ($tries -gt 50) { Write-Host '找不到空闲端口，请关闭占用端口的程序后重试。'; exit 1 } }

# 局域网 IP
$lan = (Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
  Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' -and $_.InterfaceAlias -notlike '*WSL*' } |
  Select-Object -First 1).IPAddress

$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $Port)
$listener.Start()

Write-Host ''
Write-Host '  =================================================='
Write-Host '        我的工作台 · 本地预览已启动'
Write-Host '  =================================================='
Write-Host ("   电脑访问:  http://127.0.0.1:{0}/" -f $Port)
if ($lan) { Write-Host ("   手机访问:  http://{0}:{1}/   (手机需与本机同一 Wi-Fi)" -f $lan, $Port) }
Write-Host '   停止服务:  在本窗口按 Ctrl+C'
Write-Host '  =================================================='
Write-Host ''

if (-not $NoBrowser) {
  try { Start-Process ("http://127.0.0.1:{0}/" -f $Port) | Out-Null } catch {}
}

function Write-Text($stream, [string]$text) {
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
  $stream.Write($bytes, 0, $bytes.Length)
}

function Send-Simple($stream, [string]$status, [string]$body) {
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
  $head = "HTTP/1.1 $status`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($bytes.Length)`r`nConnection: close`r`n`r`n"
  Write-Text $stream $head
  $stream.Write($bytes, 0, $bytes.Length)
}

function Handle-Client($client) {
  $client.NoDelay = $true
  $client.ReceiveTimeout = 10000
  $client.SendTimeout = 30000
  $stream = $client.GetStream()
  $stream.ReadTimeout = 10000
  $stream.WriteTimeout = 30000
  $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII, $false, 8192, $true)
  try {
    $requestLine = $reader.ReadLine()
    if (-not $requestLine) { return }
    $headers = @{}
    while ($true) {
      $line = $reader.ReadLine()
      if ($null -eq $line -or $line -eq '') { break }
      $i = $line.IndexOf(':')
      if ($i -gt 0) { $headers[$line.Substring(0, $i).Trim().ToLower()] = $line.Substring($i + 1).Trim() }
    }
    $parts = $requestLine.Split(' ')
    if ($parts.Length -lt 2) { return }
    $method = $parts[0].ToUpper()
    if ($method -ne 'GET' -and $method -ne 'HEAD') { Send-Simple $stream '405 Method Not Allowed' 'Method Not Allowed'; return }

    $rawPath = $parts[1].Split('?')[0]
    try { $rawPath = [System.Uri]::UnescapeDataString($rawPath) } catch {}
    if ($rawPath -eq '/' -or $rawPath -eq '') { $rawPath = '/index.html' }

    $rel = $rawPath.TrimStart('/') -replace '/', '\'
    # 阻止目录穿越
    if ($rel -match '\.\.') { Send-Simple $stream '403 Forbidden' 'Forbidden'; return }
    # 阻止受保护目录 / 隐藏文件
    $segments = $rel.Split('\')
    if ($segments.Length -gt 0) {
      if ($blockedTop -contains $segments[0].ToLower()) { Send-Simple $stream '404 Not Found' 'Not Found'; return }
      foreach ($s in $segments) { if ($s.StartsWith('.')) { Send-Simple $stream '404 Not Found' 'Not Found'; return } }
    }

    $full = [System.IO.Path]::GetFullPath((Join-Path $root $rel))
    if (-not $full.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) { Send-Simple $stream '403 Forbidden' 'Forbidden'; return }
    if (Test-Path -LiteralPath $full -PathType Container) { $full = Join-Path $full 'index.html' }
    if (-not (Test-Path -LiteralPath $full -PathType Leaf)) { Send-Simple $stream '404 Not Found' '404 Not Found'; return }

    $ext = [System.IO.Path]::GetExtension($full).ToLower()
    $ctype = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
    $len = (Get-Item -LiteralPath $full).Length
    $rangeHeader = $headers['range']

    $start = 0; $end = $len - 1; $partial = $false
    if ($rangeHeader -and $rangeHeader -match 'bytes=(\d*)-(\d*)') {
      $s = $matches[1]; $e = $matches[2]
      if ($s -eq '' -and $e -ne '') { $suffix = [int64]$e; $start = [Math]::Max(0, $len - $suffix); $end = $len - 1 }
      elseif ($s -ne '') { $start = [int64]$s; if ($e -ne '') { $end = [int64]$e } }
      if ($end -ge $len) { $end = $len - 1 }
      if ($start -ge $len -or $start -gt $end) {
        $h = "HTTP/1.1 416 Range Not Satisfiable`r`nContent-Range: bytes */$len`r`nContent-Length: 0`r`nConnection: close`r`n`r`n"
        Write-Text $stream $h; return
      }
      $partial = $true
    }

    $count = $end - $start + 1
    if ($partial) {
      $head = "HTTP/1.1 206 Partial Content`r`nContent-Type: $ctype`r`nContent-Range: bytes $start-$end/$len`r`nAccept-Ranges: bytes`r`nContent-Length: $count`r`nCache-Control: no-cache`r`nConnection: close`r`n`r`n"
    } else {
      $head = "HTTP/1.1 200 OK`r`nContent-Type: $ctype`r`nAccept-Ranges: bytes`r`nContent-Length: $count`r`nCache-Control: no-cache`r`nConnection: close`r`n`r`n"
    }
    Write-Text $stream $head
    if ($method -eq 'HEAD') { return }

    $fs = [System.IO.File]::OpenRead($full)
    try {
      if ($start -gt 0) { [void]$fs.Seek($start, [System.IO.SeekOrigin]::Begin) }
      $buf = New-Object byte[] 65536
      $remaining = [int64]$count
      while ($remaining -gt 0) {
        $toRead = [int][Math]::Min([int64]$buf.Length, $remaining)
        $n = $fs.Read($buf, 0, $toRead)
        if ($n -le 0) { break }
        $stream.Write($buf, 0, $n)
        $remaining -= $n
      }
      $stream.Flush()
    } finally { $fs.Close() }
  } catch {
    # 客户端断开等异常：忽略
  } finally {
    try { $reader.Dispose() } catch {}
    try { $client.Close() } catch {}
  }
}

# 主循环（顺序处理；小站点足够，且已用 Connection: close）
try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    Handle-Client $client
  }
} finally {
  try { $listener.Stop() } catch {}
}
