# 英语听力精听室（独立站点）

从 **myworkspace** 拆分出来的**独立英语听力精听站**。当前阶段只保留「四六级听力精听室」核心功能。

> 原 `myworkspace` 项目未被修改；本目录是**独立的副本**，两边互不影响。

## 功能（第一阶段）
- 四级听力题库（按 年 / 月 / 套 筛选）
- 听力题目选择
- 音频播放 / 暂停 / 重播
- 倍速（0.5× – 1.5×）
- 整段循环 / A–B 循环 / 设 A / 设 B
- 导入字幕（.srt / .vtt / .txt）
- 对照原文（逐句高亮 / 单句循环）
- 听写流程（盲听 → 听写 → 复盘）
- 复盘记录
- 现有 **39 套**四级听力音频（本地真题资源）

> 说明：目前音频均为**四级（CET4）**；暂无六级音频。顶部「六级 CET-6」为切换入口，暂无对应素材。

## 目录结构
```
english-listening/
├─ index.html                 # 入口（精听室，仅保留听力分区）
├─ start.bat                  # 一键本地启动
├─ serve.ps1                  # 本地静态服务器（无需 Python/Node）
├─ README.md
└─ assets/
   ├─ css/
   │  ├─ style.css            # 基础外壳与主题变量
   │  └─ english.css          # 模块样式
   ├─ js/
   │  ├─ english.js           # 精听室逻辑
   │  ├─ listening-data.js    # 题库条目 / 原文 / 题目
   │  └─ listening-local.js   # 39 套逐句原文 + 自动条目
   └─ audio/                  # 39 个 mp3（约 427 MB，64kbps 单声道）
```

## 本地运行
1. 双击 **`start.bat`**（无需安装任何软件）。
2. 窗口会显示地址：
   - 电脑：`http://127.0.0.1:8000/`
   - 手机（同一 Wi‑Fi）：`http://<电脑局域网IP>:8000/`
3. 停止：在该窗口按 `Ctrl+C`。

> 也可用任意静态服务器（如 VS Code Live Server）。
> 不要用 `file://` 直接打开（音频/存储行为不稳定）。

## 数据
- 用户数据（计划/词条/笔记/听写记录等）保存在浏览器 **localStorage**（键 `workspace-english`）。
- 按「站点 + 设备」隔离：**换设备/换域名/换浏览器都不会自动同步**。
- 本仓库**不包含**任何用户数据。

## 部署到 Cloudflare Pages（后续阶段，当前先不部署）
1. 把本项目推到 GitHub（新仓库，建议独立于 myworkspace）。
2. Cloudflare → **Workers & Pages → Create → Pages → Connect to Git** → 选该仓库。
3. 构建设置：
   - **Framework preset**：`None`
   - **Build command**：**留空**
   - **Build output directory**：`.`
4. **Save and Deploy** → 得到 `https://<项目名>.pages.dev`。

> 注意：Cloudflare Pages **单文件上限 25 MiB**。本项目音频最大约 12 MB，**可直接部署**（首次上传约 427 MB，稍慢）。
