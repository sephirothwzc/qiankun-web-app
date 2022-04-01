import { FeedbackType } from '@/services/api-type';
import { postFeedBackList } from '@/services/feedback.service';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Table } from 'antd';
import { FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { exportHeaderByColumn } from '@/utils/antd-helper';
import { useImmer } from 'use-immer';

const columns: Array<ProColumns<FeedbackType>> = [
  {
    title: '经纪人姓名',
    dataIndex: 'brokerId',
    key: 'brokerId',
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '问题类型',
    dataIndex: 'suggestionTypeName',
    key: 'suggestionTypeName',
  },
  {
    title: '问题描述',
    dataIndex: 'suggestionDesc',
    key: 'suggestionDesc',
  },
  {
    title: '图片',
    dataIndex: 'imgArray',
    hideInSearch: true,
    key: 'imgArray',
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    key: 'createTime',
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    valueType: 'dateRange',
    hideInTable: true,
    key: 'createTime',
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [<Link to={`/feedback/${record.id}`}>跟进</Link>],
  },
];

/**
 * 导出表头
 */
const exportHeader = exportHeaderByColumn(columns);
/**
 * 意见反馈管理
 * @returns
 */
const List: FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectRows, setSelectRows] = useImmer<Array<FeedbackType>>([]);
  // #region handle
  const handleSelectChange = (selectedRowKeys: React.Key[], selectedRows: FeedbackType[]) => {
    setSelectRows(() => selectedRows);
  };
  // #endregion
  return (
    <ProTable<FeedbackType>
      actionRef={actionRef}
      columns={columns}
      rowKey="id"
      request={async (params = {}, sort, filter) => {
        return postFeedBackList(params, sort, filter).then((res) => {
          return { ...res, success: true };
        });
      }}
      toolBarRender={() => [
        <Button key="out">
          <CSVLink data={selectRows} headers={exportHeader}>
            导出数据
            <DownloadOutlined />
          </CSVLink>
        </Button>,
      ]}
      rowSelection={{
        // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
        // 注释该行则默认不显示下拉选项
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        onChange: handleSelectChange,
        // defaultSelectedRowKeys: [1],
      }}
    ></ProTable>
  );
};

export default List;
