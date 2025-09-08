
import axios from 'axios';
import { from, map, catchError, of } from 'rxjs';

const API_BASE_URL = 'http://localhost:4000';

/**
 * @description 从订单服务中获取用户的订单数据.
 * SRP: 该模块的唯一职责是与订单服务API进行通信.
 * @param {string} userId 要获取订单的用户ID.
 * @returns 一个RxJS Observable，用于发出用户的订单有效负载或特定的错误对象.
 */
export function fetchUserOrders(userId) {
  // 为明确禁用此请求的任何系统代理，请添加 { proxy: false }.
  return from(axios.get(`${API_BASE_URL}/orders`, { params: { userId }, proxy: false })).pipe(
    // 关键变更：从axios响应中提取.data属性.
    map(response => response.data),
    catchError(error => {
      const errorMessage = error.response?.data?.error || error.message;
      // 优雅地处理错误，确保一个失败的API调用不会破坏整个聚合过程.
      return of({ error: true, details: `Failed to fetch orders: ${errorMessage}` });
    })
  );
}
