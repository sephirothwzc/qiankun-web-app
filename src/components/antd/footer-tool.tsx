import { FC } from 'react';
import { FooterToolbar } from '@ant-design/pro-layout';

interface IFooterToolProps {
  dom: JSX.Element[];
}

/**
 * form表单 提交
 * @param props
 * @returns
 */
const FooterTool: FC<IFooterToolProps> = (props) => {
  return <FooterToolbar>{props.dom}</FooterToolbar>;
};

export default FooterTool;
