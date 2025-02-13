#!/bin/bash

# 设置颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否为root用户
check_root() {
    if [ "$EUID" -ne 0 ]; then
        echo -e "${RED}请使用root权限运行此脚本${NC}"
        exit 1
    fi
}

# 更新系统包
update_system() {
    echo -e "${YELLOW}正在更新系统包...${NC}"
    apt update && apt upgrade -y
}

# 安装基础依赖
install_dependencies() {
    echo -e "${YELLOW}正在安装基础依赖...${NC}"
    
    # 安装curl
    apt install -y curl

    # 安装Node.js
    echo -e "${YELLOW}正在安装Node.js...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
    apt install -y nodejs
    
    # 安装MongoDB
    echo -e "${YELLOW}正在安装MongoDB...${NC}"
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
    apt update
    apt install -y mongodb-org

    # 安装Nginx
    echo -e "${YELLOW}正在安装Nginx...${NC}"
    apt install -y nginx

    # 安装PM2
    echo -e "${YELLOW}正在安装PM2...${NC}"
    npm install -g pm2
}

# 启动服务
start_services() {
    echo -e "${YELLOW}正在启动服务...${NC}"
    
    # 启动MongoDB
    systemctl start mongod
    systemctl enable mongod
    
    # 启动Nginx
    systemctl start nginx
    systemctl enable nginx
}

# 配置项目
setup_project() {
    echo -e "${YELLOW}正在配置项目...${NC}"
    
    # 创建工作目录
    mkdir -p /var/www/modern-memo
    cd /var/www/modern-memo

    # 克隆项目
    echo -e "${YELLOW}正在克隆项目...${NC}"
    git clone https://github.com/c1767673917/--.git .

    # 设置环境变量
    echo -e "${YELLOW}正在配置环境变量...${NC}"
    cat > backend/.env << EOL
PORT=3000
MONGODB_URI=mongodb://localhost:27017/modern-memo
JWT_SECRET=$(openssl rand -base64 32)
EOL

    # 安装依赖
    echo -e "${YELLOW}正在安装项目依赖...${NC}"
    cd backend
    npm install
    npm run build

    cd ../frontend
    npm install
    npm run build

    # 配置Nginx
    echo -e "${YELLOW}正在配置Nginx...${NC}"
    cat > /etc/nginx/sites-available/modern-memo << EOL
server {
    listen 80;
    server_name _;

    # 前端配置
    location / {
        root /var/www/modern-memo/frontend/dist;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    # 后端API配置
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

    # 启用站点配置
    ln -sf /etc/nginx/sites-available/modern-memo /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    nginx -t
    systemctl restart nginx

    # 使用PM2启动后端服务
    cd /var/www/modern-memo/backend
    pm2 start dist/index.js --name "modern-memo-backend"
    pm2 save
    pm2 startup
}

# 配置防火墙
setup_firewall() {
    echo -e "${YELLOW}正在配置防火墙...${NC}"
    ufw allow 80
    ufw allow 443
    ufw allow 3000
}

# 设置权限
setup_permissions() {
    echo -e "${YELLOW}正在设置权限...${NC}"
    chown -R www-data:www-data /var/www/modern-memo
    chmod -R 755 /var/www/modern-memo
}

# 主函数
main() {
    echo -e "${GREEN}开始安装Modern Memo系统...${NC}"
    
    check_root
    update_system
    install_dependencies
    start_services
    setup_project
    setup_firewall
    setup_permissions

    echo -e "${GREEN}安装完成！${NC}"
    echo -e "${GREEN}您可以通过以下地址访问系统：${NC}"
    echo -e "${GREEN}前端：http://your_server_ip${NC}"
    echo -e "${GREEN}后端API：http://your_server_ip/api${NC}"
    
    # 显示服务状态
    echo -e "\n${YELLOW}服务状态：${NC}"
    systemctl status mongod --no-pager
    systemctl status nginx --no-pager
    pm2 status
}

# 运行主函数
main 