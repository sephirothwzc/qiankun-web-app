import service from '@/utils/axios-helper';
import { Maybe } from '@/utils/type-helper';
import { MessageType, WebPageResult } from './api-type';

/**
 * 消息列表
 */
export const postMessageList = (
  params?: MessageType & {
    pageSize?: Maybe<number>;
    current?: Maybe<number>;
  },
  sort?: any,
  filter?: any
) =>
  service
    .post<WebPageResult<MessageType>>('/admin-web/message/list', {
      ...params,
      sort,
      filter,
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(JSON.stringify(error));
    });

/**
 * 修改消息信息
 * @param params
 * @returns
 */
export const putMessageById = (params: MessageType) => {
  return service.post<string>(`/admin-web/message`, params);
};
