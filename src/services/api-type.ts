/**
 * 返回值对象
 */
export type WebResult<T> = {
  /**
   *
   */
  data?: T;

  /**
   *
   */
  message?: string;

  /**
   *
   */
  status?: number;
};

export type FeedbackType = {
  /**
   * 经纪人ID
   */
  brokerId?: string;

  /**
   * 创建时间
   */
  createTime?: string;

  /**
   * 图片集合
   */
  imgArray?: Array<{ imageUrl: string }>;

  /**
   * 意见跟进时间
   */
  respTime?: string;

  /**
   * 跟进响应内容
   */
  responseDesc?: string;

  /**
   * 意见描述
   */
  suggestionDesc?: string;

  /**
   *
   */
  suggestionId?: string;

  /**
   * 意见类型ID
   */
  suggestionTypeId?: string;

  /**
   * 意见类型名称
   */
  suggestionTypeName?: string;
};
