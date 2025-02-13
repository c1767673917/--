#!/bin/bash

# 设置颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# 检查必要的软件
check_prerequisites() {
    echo -e "${YELLOW}检查必要的软件...${NC}"
    
    # 检查Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}未安装Node.js！请先安装Node.js 16+版本${NC}"
        exit 1
    else
        echo -e "${GREEN}Node.js版本: $(node -v)${NC}"
    fi
    
    # 检查MongoDB
    if ! command -v mongod &> /dev/null; then
        echo -e "${RED}未安装MongoDB！请先安装MongoDB 4.4+版本${NC}"
        exit 1
    else
        echo -e "${GREEN}MongoDB已安装${NC}"
    fi
}

# 安装依赖
install_dependencies() {
    echo -e "\n${YELLOW}开始安装项目依赖...${NC}"
    
    # 安装后端依赖
    echo -e "\n${CYAN}安装后端依赖...${NC}"
    cd ../backend || exit
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}后端依赖安装失败！${NC}"
        exit 1
    fi
    
    # 安装前端依赖
    echo -e "\n${CYAN}安装前端依赖...${NC}"
    cd ../frontend || exit
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}前端依赖安装失败！${NC}"
        exit 1
    fi
}

# 构建项目
build_project() {
    echo -e "\n${YELLOW}开始构建项目...${NC}"
    
    # 构建后端
    echo -e "\n${CYAN}构建后端...${NC}"
    cd ../backend || exit
    npm run build
    if [ $? -ne 0 ]; then
        echo -e "${RED}后端构建失败！${NC}"
        exit 1
    fi
    
    # 构建前端
    echo -e "\n${CYAN}构建前端...${NC}"
    cd ../frontend || exit
    npm run build
    if [ $? -ne 0 ]; then
        echo -e "${RED}前端构建失败！${NC}"
        exit 1
    fi
}

# 启动开发服务器
start_dev_server() {
    echo -e "\n${YELLOW}启动开发服务器...${NC}"
    
    # 启动后端服务器
    echo -e "\n${CYAN}启动后端服务器...${NC}"
    cd ../backend || exit
    npm run dev &
    
    # 启动前端服务器
    echo -e "\n${CYAN}启动前端服务器...${NC}"
    cd ../frontend || exit
    npm run dev &
}

# 主函数
main() {
    echo -e "${MAGENTA}Modern Memo 项目部署脚本${NC}"
    echo -e "${MAGENTA}=========================${NC}"
    
    check_prerequisites
    install_dependencies
    build_project
    start_dev_server
    
    echo -e "\n${GREEN}部署完成！${NC}"
    echo -e "${YELLOW}后端服务运行在: http://localhost:3000${NC}"
    echo -e "${YELLOW}前端服务运行在: http://localhost:5173${NC}"
    
    # 保持脚本运行
    wait
}

# 运行主函数
main 