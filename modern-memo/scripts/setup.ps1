# 检查是否安装了必要的软件
function Check-Prerequisites {
    Write-Host "检查必要的软件..." -ForegroundColor Yellow
    
    # 检查Node.js
    try {
        $nodeVersion = node -v
        Write-Host "Node.js版本: $nodeVersion" -ForegroundColor Green
    }
    catch {
        Write-Host "未安装Node.js！请先安装Node.js 16+版本" -ForegroundColor Red
        exit 1
    }
    
    # 检查MongoDB
    try {
        $mongoVersion = mongod --version
        Write-Host "MongoDB已安装" -ForegroundColor Green
    }
    catch {
        Write-Host "未安装MongoDB！请先安装MongoDB 4.4+版本" -ForegroundColor Red
        exit 1
    }
}

# 安装依赖
function Install-Dependencies {
    Write-Host "`n开始安装项目依赖..." -ForegroundColor Yellow
    
    # 安装后端依赖
    Write-Host "`n安装后端依赖..." -ForegroundColor Cyan
    Set-Location -Path "../backend"
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "后端依赖安装失败！" -ForegroundColor Red
        exit 1
    }
    
    # 安装前端依赖
    Write-Host "`n安装前端依赖..." -ForegroundColor Cyan
    Set-Location -Path "../frontend"
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "前端依赖安装失败！" -ForegroundColor Red
        exit 1
    }
}

# 构建项目
function Build-Project {
    Write-Host "`n开始构建项目..." -ForegroundColor Yellow
    
    # 构建后端
    Write-Host "`n构建后端..." -ForegroundColor Cyan
    Set-Location -Path "../backend"
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "后端构建失败！" -ForegroundColor Red
        exit 1
    }
    
    # 构建前端
    Write-Host "`n构建前端..." -ForegroundColor Cyan
    Set-Location -Path "../frontend"
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "前端构建失败！" -ForegroundColor Red
        exit 1
    }
}

# 启动开发服务器
function Start-DevServer {
    Write-Host "`n启动开发服务器..." -ForegroundColor Yellow
    
    # 启动后端服务器
    Write-Host "`n启动后端服务器..." -ForegroundColor Cyan
    Start-Process -FilePath "cmd" -ArgumentList "/c cd ../backend && npm run dev"
    
    # 启动前端服务器
    Write-Host "`n启动前端服务器..." -ForegroundColor Cyan
    Start-Process -FilePath "cmd" -ArgumentList "/c cd ../frontend && npm run dev"
}

# 主函数
function Main {
    Write-Host "Modern Memo 项目部署脚本" -ForegroundColor Magenta
    Write-Host "=========================" -ForegroundColor Magenta
    
    Check-Prerequisites
    Install-Dependencies
    Build-Project
    Start-DevServer
    
    Write-Host "`n部署完成！" -ForegroundColor Green
    Write-Host "后端服务运行在: http://localhost:3000" -ForegroundColor Yellow
    Write-Host "前端服务运行在: http://localhost:5173" -ForegroundColor Yellow
}

# 运行主函数
Main 