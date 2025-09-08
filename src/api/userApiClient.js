
import axios from 'axios';
import { from, map, catchError, of } from 'rxjs';

const API_BASE_URL = 'http://localhost:4000';

/**
 * @description 从用户服务中获取用户数据.
 * SRP: 该模块的唯一职责是与用户服务API进行通信.
 * @param {string} userId 要获取的用户的ID.
 * @returns 一个RxJS可观察对象，它发出用户数据有效负载或特定的错误对象.
 */
export function fetchUser(userId) {
  // 为明确禁用此请求的任何系统代理，添加了 { proxy: false }.
  return from(axios.get(`${API_BASE_URL}/users/${userId}`, { proxy: false })).pipe(
    // 关键变更：使用 'map' 从 axios 响应中提取 .data 属性.
    // 其余部分现在只处理纯数据，而不是axios响应对象.
    map(response => response.data),
    catchError(error => {
      const errorMessage = error.response?.data?.error || error.message;
      // 返回一个可观察对象，该对象发出一个特定的错误对象，然后完成.
      // 这防止了错误导致整个forkJoin流终止.
      return of({ error: true, details: `Failed to fetch user: ${errorMessage}` });
    })
  );
}
