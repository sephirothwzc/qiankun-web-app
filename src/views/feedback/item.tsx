import { FC, useRef } from 'react';
import ProForm, { ProFormInstance, ProFormTextArea } from '@ant-design/pro-form';
import { FeedbackType } from '@/services/api-type';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { Descriptions, message } from 'antd';
import { useRequest } from 'ahooks';
import { getFeedBack, putFeedBack } from '@/services/feedback.service';
import { MESSAGE_COPYWRITING, proFormProperty } from '@/utils/antd-helper';

/**
 * 跟进
 * @returns
 */
const Item: FC = () => {
  const { id } = useParams();
  const formRef = useRef<ProFormInstance<FeedbackType>>();
  const { data, error, loading } = useRequest(getFeedBack, { defaultParams: [String(id)] });
  const { runAsync: runAsyncSave } = useRequest(putFeedBack, { manual: true });
  /**
   * 提交
   */
  const handleFinish = async (formData: FeedbackType) => {
    return runAsyncSave(String(id), formData)
      .then((res) => {
        message.success(MESSAGE_COPYWRITING.SAVE_SUCCESS);
      })
      .catch((error) => {
        console.log(error);
        message.error(MESSAGE_COPYWRITING.SAVE_ERROR);
      });
  };
  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        loading={loading}
        ghost
        header={{
          title: '意见反馈跟进',
          breadcrumb: {},
        }}
        content={
          <Descriptions column={2}>
            <Descriptions.Item label="经纪人姓名">曲丽丽</Descriptions.Item>
            <Descriptions.Item label="联系方式">18554870099</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data?.createTime}</Descriptions.Item>
            <Descriptions.Item label="问题类型">{data?.suggestionTypeName}</Descriptions.Item>
            <Descriptions.Item label="问题类型">{data?.suggestionDesc}</Descriptions.Item>
          </Descriptions>
        }
      >
        <ProForm<FeedbackType>
          formRef={formRef}
          onFinish={handleFinish}
          autoFocusFirstInput
          {...proFormProperty}
        >
          <ProFormTextArea
            name="responseDesc"
            label="跟进响应"
            placeholder="跟进响应"
            fieldProps={{
              allowClear: true,
              showCount: true,
            }}
          />
        </ProForm>
      </PageContainer>
    </div>
  );
};

export default Item;
