# API Aggregation with RxJS

一个使用 Node.js、Express.js 和 RxJS 实现 API 聚合的示例项目。该项目演示了如何优雅地组合来自多个微服务的数据，并使用响应式编程模式处理异步操作。

## 📋 项目概述

本项目实现了一个用户画像聚合服务，它能够：

- 从用户服务获取用户基本信息
- 从订单服务获取用户订单历史
- 将多个数据源聚合为统一的用户画像响应
- 优雅地处理单个服务的失败，确保服务的弹性

## 🛠 技术栈

### 核心框架
- **Node.js** - JavaScript 运行时环境
- **Express.js** - Web 应用框架
- **RxJS** - 响应式编程库，用于处理异步数据流

### 依赖库
- **Axios** - HTTP 客户端，用于发起 API 请求
- **Nodemon** - 开发环境下的自动重启工具
- **Concurrently** - 并行运行多个 npm 脚本

## 🏗 项目架构

```
nodejs-rxjs-project/
├── src/
│   ├── app.js                    # Express 应用配置
│   ├── api/                      # API 客户端层
│   │   ├── userApiClient.js      # 用户服务客户端
│   │   └── orderApiClient.js     # 订单服务客户端
│   ├── controllers/              # 控制器层
│   │   └── userProfileController.js
│   ├── routes/                   # 路由层
│   │   └── userProfileRoutes.js
│   └── services/                 # 业务逻辑层
│       └── aggregationService.js # 数据聚合服务
├── mock-apis/
│   └── mockApiServer.js          # 模拟 API 服务器
├── server.js                     # 应用入口
└── package.json
```

### 架构设计原则

本项目遵循以下设计原则：

- **单一职责原则 (SRP)**: 每个模块都有明确的单一职责
- **开闭原则 (OCP)**: 易于扩展新的数据源而无需修改现有代码
- **依赖倒置原则 (DIP)**: 高层模块依赖抽象而非具体实现

## 🚀 快速开始

### 环境要求

- Node.js 14.0 或更高版本
- npm 6.0 或更高版本

### 安装依赖

```bash
npm install
```

### 运行应用

#### 方式一：同时启动主服务和模拟 API 服务（推荐）

```bash
npm run dev
```

这会并行启动：
- 主应用服务器 (端口 3000)
- 模拟 API 服务器 (端口 4000)

#### 方式二：分别启动服务

**启动主应用服务器：**
```bash
npm start
```

**启动模拟 API 服务器（另开终端）：**
```bash
npm run start:mock
```

## 📡 API 文档

### 获取用户画像

**端点:** `GET /api/user-profile/:userId`

**参数:**
- `userId` (路径参数) - 用户ID

**响应示例:**

成功响应 (200):
```json
{
  "userInfo": {
    "id": "1",
    "name": "Alice",
    "email": "alice@example.com"
  },
  "recentOrders": [
    {
      "orderId": "o101",
      "total": 150,
      "date": "2024-09-01"
    },
    {
      "orderId": "o102",
      "total": 200,
      "date": "2024-09-05"
    }
  ],
  "aggregationInfo": {
    "timestamp": "2024-09-08T10:30:00.000Z",
    "sources": ["UserService", "OrderService"],
    "errors": []
  }
}
```

用户不存在 (500):
```json
{
  "error": "Failed to aggregate user profile.",
  "details": "Failed to fetch user: User not found"
}
```

### 测试端点

```bash
# 成功案例
curl http://localhost:3000/api/user-profile/1

# 用户不存在案例
curl http://localhost:3000/api/user-profile/3
```

## 🔧 开发调试

### 启动开发环境

```bash
npm run dev
```

### 日志输出

应用包含详细的日志输出，帮助调试：

- 请求日志：显示收到的 HTTP 请求
- API 调用日志：显示对模拟 API 的请求
- 聚合完成日志：显示数据聚合的完成状态

### Mock API 端点

模拟 API 服务器提供以下端点：

- `GET /users/:id` - 获取用户信息
- `GET /orders?userId=:userId` - 获取用户订单

## 💡 核心特性

### RxJS 响应式编程

项目使用 RxJS 的核心操作符：

- **forkJoin**: 并行执行多个 API 请求
- **map**: 转换和处理数据
- **catchError**: 优雅地处理错误
- **from**: 将 Promise 转换为 Observable

### 错误处理策略

- **关键数据失败**: 如果用户数据获取失败，整个请求失败
- **非关键数据失败**: 如果订单数据获取失败，返回空数组并记录错误
- **网络延迟模拟**: 模拟真实的网络延迟情况

### 弹性设计

- 单个服务失败不会影响整个响应
- 详细的错误信息记录在聚合信息中
- 自动重试和降级策略（可扩展）

## 📦 构建和部署

### 生产环境构建

```bash
# 安装生产依赖
npm install --production

# 启动生产服务
NODE_ENV=production npm start
```

### 环境变量

| 变量名 | 默认值 | 描述 |
|--------|--------|------|
| `PORT` | 3000 | 主服务器端口 |
| `NODE_ENV` | development | 运行环境 |

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目使用 ISC 许可证。详见 [LICENSE](LICENSE) 文件。

## 🔗 相关资源

- [RxJS 官方文档](https://rxjs.dev/)
- [Express.js 官方文档](https://expressjs.com/)
- [Node.js 官方文档](https://nodejs.org/)
- [Axios 文档](https://axios-http.com/)

## 📞 支持

如果您有任何问题或建议，请：

1. 查看现有的 [Issues](../../issues)
2. 创建新的 Issue
3. 参与 [Discussions](../../discussions)

---

⭐ 如果这个项目对您有帮助，请给我们一个 star！
