import footerTool from '@/components/antd/footer-tool';
import { ProColumns } from '@ant-design/pro-table';

// #region protable
/**
 * 导出表头
 * @param columns
 * @returns
 */
export const exportHeaderByColumn = (columns: Array<ProColumns>) => {
  return columns
    .filter((p) => !p.hideInTable)
    .map((p) => ({ label: String(p.title), key: String(p.key) }));
};
// #endregion

// #region proForm 默认参数
export const proFormProperty = {
  submitter: {
    render: (_: any, dom: JSX.Element[]) => footerTool({ dom }),
  },
};
// #endregion

// #region message
/**
 * 消息提醒
 */
export const MESSAGE_COPYWRITING = {
  /**
   * 保存成功
   */
  SAVE_SUCCESS: '保存成功',
  SAVE_ERROR: '保存失败',
};
// #endregion
