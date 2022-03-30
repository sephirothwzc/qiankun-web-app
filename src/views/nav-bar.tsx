import ProCard from '@ant-design/pro-card';
import { FC } from 'react';
import { routeConfig, RouteConfigType } from '@/route';
import ProList from '@ant-design/pro-list';
import { Link } from 'react-router-dom';

const NavBar: FC = () => (
  <ProCard>
    <ProList<RouteConfigType>
      headerTitle="导航"
      dataSource={routeConfig}
      metas={{
        title: { dataIndex: 'name' },
        description: {
          dataIndex: 'path',
        },
        subTitle: {
          render: (text: React.ReactNode, record, index: number) => {
            return <Link to={record.path}>TODO</Link>;
          },
        },
      }}
    ></ProList>
  </ProCard>
);

export default NavBar;
