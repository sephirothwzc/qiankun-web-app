import { MessageType } from '@/services/api-type';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Switch, Table } from 'antd';
import { FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { exportHeaderByColumn } from '@/utils/antd-helper';
import { useImmer } from 'use-immer';
import { useRequest } from 'ahooks';
import { postMessageList, putMessageById } from '@/services/message.service';
import { PageContainer } from '@ant-design/pro-layout';

/**
 * 生成columns
 * @param handleEnableChange
 */
const useColumns = (
  handleEnableChange: (checked: boolean, record: MessageType) => void
): [
  Array<ProColumns<MessageType>>,
  Array<{
    label: string;
    key: string;
  }>
] => {
  const columns: Array<ProColumns<MessageType>> = [
    {
      title: '消息描述',
      dataIndex: 'brokerId',
      key: 'brokerId',
    },
    {
      title: '消息类型',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      key: 'createTime',
    },
    {
      title: '发布时间',
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
      title: ' 发布人',
      dataIndex: 'suggestionDesc',
      key: 'suggestionDesc',
    },
    {
      title: ' 是否启用',
      dataIndex: 'imgArray',
      key: 'imgArray',
      valueType: 'switch',
      render: (text, record, _, action) => [
        <Switch onChange={(checked: boolean) => handleEnableChange(checked, record)} />,
      ],
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [<Link to={`/feedback/${record.id}`}>修改</Link>],
    },
  ];

  /**
   * 导出表头
   */
  const exportHeader = exportHeaderByColumn(columns);

  return [columns, exportHeader];
};

/**
 * 消息管理
 * @returns
 */
const List: FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectRows, setSelectRows] = useImmer<Array<MessageType>>([]);

  // #region services
  const { runAsync: runAsyncSave, loading } = useRequest(putMessageById, { manual: true });
  // #endregion

  // #region handle
  const handleEnableChange = (checked: boolean, record: MessageType) => {};

  const [columns, exportHeader] = useColumns(handleEnableChange);

  const handleSelectChange = (selectedRowKeys: React.Key[], selectedRows: MessageType[]) => {
    setSelectRows(() => selectedRows);
  };
  // #endregion

  return (
    <PageContainer loading={loading}>
      <ProTable<MessageType>
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        request={async (params = {}, sort, filter) => {
          return postMessageList(params as any, sort, filter).then((res) => {
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
    </PageContainer>
  );
};

export default List;
