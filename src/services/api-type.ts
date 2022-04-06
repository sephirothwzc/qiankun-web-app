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

/**
 * 分页组件
 */
export type WebPageResult<T> = WebResult<{ data: Array<T>; total: number }>;

/**
 * 意见反馈模糊查询
 */
export type FeedbackType = {
  /**
   * 经纪人ID
   */
  brokerId?: string;

  /**
   * 经纪人姓名
   */
  brokerName?: string;

  /**
   * 经纪人手机号 联系方式
   */
  brokerTel?: string;

  /**
   * 创建时间
   */
  createTime?: string;

  /**
   * 创建时间 字符串
   */
  createTimeStr?: string;

  /**
   * 图片地址集合
   */
  imgUrlList?: Array<string>;

  /**
   * 意见跟进标识 0:未跟进 1:已跟进
   */
  respFlag?: number;

  /**
   * 意见跟进状态描述 0:未跟进 1:已跟进
   */
  respFlagDesc?: string;

  /**
   * 意见跟进时间
   */
  respTime?: string;

  /**
   * 意见跟进时间 字符串
   */
  respTimeStr?: string;

  /**
   * 跟进响应内容
   */
  responseDesc?: string;

  /**
   * 意见描述
   */
  suggestionDesc?: string;

  /**
   * 意见表主键
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

/**
 * 消息
 */
export type MessageType = {
  id: string;
  /**
   * 启用
   */
  enableFlag: boolean;
};
