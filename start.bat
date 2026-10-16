@echo off
cd /d "%~dp0"
title Workspace - Local Preview
echo.
echo   Starting local preview (no install / no Python needed)...
echo   If Windows Firewall pops up, ALLOW it on "Private networks" (needed for phone access).
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
echo.
echo   Server stopped. Press any key to close this window.
pause >nul
