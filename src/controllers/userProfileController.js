
import * as aggregationService from '../services/aggregationService.js';

/**
 * @description 控制器用于处理用户资料聚合请求。
 * SRP: 该模块的职责是管理HTTP请求/响应周期。
 *      它将路由（HTTP世界）连接到服务（业务逻辑世界）。
 * @param {object} req Express 请求对象.
 * @param {object} res Express 响应对象.
 */
export function getProfile(req, res) {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  // 调用服务，该服务返回一个可观察对象。我们必须订阅它以触发执行.
  const subscription = aggregationService.getAggregatedUserProfile(userId).subscribe({
    // 'next' 在可观察对象发出值（我们的聚合数据）时被调用.
    next: (profileData) => {
      res.status(200).json(profileData);
    },
    // 如果可观察流中的任何部分抛出错误，将调用 'error'.
    error: (err) => {
      // 这将捕获我们服务中抛出的错误，例如用户获取失败.
      res.status(500).json({ error: 'Failed to aggregate user profile.', details: err.message });
    },
    // 'complete' 在流结束时被调用。我们在这里不需要做任何事情.
    complete: () => {
      console.log(`Aggregation for user ${userId} completed.`);
      // 尽管在短生命周期的 HTTP 请求中，流会自动完成并清理，但进行取消订阅仍然是一个好的实践。
      if (subscription) {
        subscription.unsubscribe();
      }
    },
  });
}
