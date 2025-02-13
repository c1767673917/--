# Modern Memo 现代化备忘录系统

一个基于现代技术栈构建的备忘录系统，采用前后端分离架构，提供简洁优雅的用户界面和强大的功能特性。

## 技术架构

### 前端技术栈
- React 18
- TypeScript
- Ant Design 5.x
- Redux Toolkit
- Axios
- Vite

### 后端技术栈
- Node.js
- Express.js
- MongoDB
- JWT认证
- RESTful API

## 核心功能
- 📝 创建、编辑、删除备忘录
- 📂 分类管理
- 🏷️ 标签系统
- 🔍 全文搜索
- 📅 日期归档
- 🔒 用户认证
- 💾 自动保存
- 📱 响应式设计

## 项目结构
```
modern-memo/
├── frontend/          # 前端项目目录
├── backend/           # 后端项目目录
├── scripts/           # 部署和环境配置脚本
└── docs/             # 项目文档
```

## 快速开始

### 环境要求
- Node.js 16+
- MongoDB 4.4+
- Git

### 一键部署
```bash
# Windows
.\scripts\setup.ps1

# Linux/MacOS
./scripts/setup.sh
```

### 手动部署

1. 克隆项目
```bash
git clone https://github.com/yourusername/modern-memo.git
cd modern-memo
```

2. 安装后端依赖
```bash
cd backend
npm install
```

3. 安装前端依赖
```bash
cd ../frontend
npm install
```

4. 启动开发服务器
```bash
# 后端服务器
cd backend
npm run dev

# 前端服务器
cd frontend
npm run dev
```

## 开发规范
- 使用ESLint进行代码规范检查
- 使用Prettier进行代码格式化
- 遵循Git Flow工作流
- 使用Conventional Commits规范

## 贡献指南
欢迎提交Pull Request或Issue！

## 许可证
MIT License 