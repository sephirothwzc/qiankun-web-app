import { FeedbackType, WebPageResult, WebResult } from './api-type';
import service from '@/utils/axios-helper';
import { Maybe } from '@/utils/type-helper';

/**
 * 意见反馈
 */
export const postFeedBackList = (
  params?: FeedbackType & {
    pageSize?: Maybe<number>;
    current?: Maybe<number>;
  },
  sort?: any,
  filter?: any
) =>
  service
    .post<WebPageResult<FeedbackType>>('/admin-web/idea/list', {
      param: params,
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
 * 获取意见反馈
 * @param id
 */
export const getFeedBack = (id: string) => {
  return service
    .get<WebResult<FeedbackType>>(`/admin-web/idea/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(JSON.stringify(error));
    });
};

/**
 * 修改意见反馈
 * @param id
 * @param param
 * @returns
 */
export const putFeedBack = (id: string, param: FeedbackType) => {
  return service
    .put<string>(`/admin-web/idea/${id}`, {
      param,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(JSON.stringify(error));
    });
};
