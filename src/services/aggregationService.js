
import { forkJoin, map } from 'rxjs';
import * as userApiClient from './../api/userApiClient.js';
import * as orderApiClient from './../api/orderApiClient.js';

/**
 * @description 聚合来自多个来源的用户配置文件数据.
 * SRP: 该服务的职责是数据聚合的业务逻辑.
 * OCP: 要添加新的数据源，我们可以添加一个新的 API 客户端并将其加入 forkJoin.
 * DIP: 这个高层模块依赖于API客户端提供的抽象.
 * @param {string} userId 用户ID.
 * @returns 一个RxJS Observable，它发出完全聚合的用户配置文件.
 */
export function getAggregatedUserProfile(userId) {
  return forkJoin({
    user: userApiClient.fetchUser(userId),
    orders: orderApiClient.fetchUserOrders(userId),
  }).pipe(
    map(({ user, orders }) => {
      // Key Change: Check for our new, consistent error object shape.
      if (user.error) {
        // If the critical user data fails, we throw an error to stop the process.
        // This will be caught by the controller's 'error' block.
        throw new Error(user.details);
      }

      // The final aggregated object.
      return {
        // Key Change: 'user' and 'orders' are now the pure data, not response objects.
        userInfo: user,
        recentOrders: orders.error ? [] : orders, // If orders fail, gracefully return an empty array.
        aggregationInfo: {
          timestamp: new Date().toISOString(),
          sources: ['UserService', 'OrderService'],
          // If the non-critical orders API had an error, we log it here.
          errors: orders.error ? [orders.details] : [],
        },
      };
    })
  );
}
