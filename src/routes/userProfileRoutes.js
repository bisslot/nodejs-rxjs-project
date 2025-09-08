
import { Router } from 'express';
import * as userProfileController from '../controllers/userProfileController.js';

// SRP：该模块的职责是定义用户资料功能的路由。
const router = Router();

// 一个触发API聚合的单个GET端点。
router.get('/user-profile/:userId', userProfileController.getProfile);

export default router;
