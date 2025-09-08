
import express from 'express';

const app = express();
const PORT = 4000;

// 模拟的用户数据库
const users = {
  '1': { id: '1', name: 'Alice', email: 'alice@example.com' },
  '2': { id: '2', name: 'Bob', email: 'bob@example.com' },
};

// 模拟的订单数据库
const orders = {
  '1': [
    { orderId: 'o101', total: 150, date: '2024-09-01' },
    { orderId: 'o102', total: 200, date: '2024-09-05' },
  ],
  '2': [{ orderId: 'o201', total: 50, date: '2024-09-08' }],
};

// --- 模拟用户服务 API ---
app.get('/users/:id', (req, res) => {
  console.log(`[Mock API] Request for user ${req.params.id} received.`);
  const user = users[req.params.id];
  if (user) {
    // 模拟网络延迟
    setTimeout(() => res.json(user), 50);
  } else {
    setTimeout(() => res.status(404).json({ error: 'User not found' }), 50);
  }
});

// --- 模拟订单服务 API ---
app.get('/orders', (req, res) => {
  const userId = req.query.userId;
  console.log(`[Mock API] Request for orders of user ${userId} received.`);
  const userOrders = orders[userId];
  if (userOrders) {
    // 模拟网络延迟
    setTimeout(() => res.json(userOrders), 100);
  } else {
    // 即使用户存在，也可能没有订单，返回空数组是正常情况
    setTimeout(() => res.json([]), 100);
  }
});

app.listen(PORT, () => {
  console.log(`[Mock API Server] Running on http://localhost:${PORT}`);
});
