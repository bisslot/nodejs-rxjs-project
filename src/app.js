
import express from 'express';
import userProfileRoutes from './routes/userProfileRoutes.js';

// SRP：该模块的职责是创建和配置Express应用程序。
const app = express();

// 中间件
app.use(express.json());

// 一个简单的日志中间件，用于查看传入的请求
app.use((req, res, next) => {
  console.log(`[Main App] Request received: ${req.method} ${req.originalUrl}`);
  next();
});

// 路由
// 所有用户资料功能的路由在这里进行模块化处理。
app.use('/api', userProfileRoutes);

// 通用404处理程序，用于处理未找到的路由
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// 通用错误处理器
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
