import { LogoutOutlined, UserOutlined } from '@ant-design/icons/lib/icons';
import { ProLayout, PageContainer } from '@ant-design/pro-components';
import { css } from '@emotion/react';
import { Avatar, Dropdown } from 'antd';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import layoutProps from './props';
// import Footer from '../../components/Footer';

export default function Root() {
  const { pathname } = useLocation();
  const style = css`
    .ant-layout {
      height: 100%;
      .ant-layout-content {
        overflow: auto;
        padding: 0;
      }
    }
  `;
  return (
    <ProLayout
      {...layoutProps}
      className="h-full"
      layout="mix"
      theme="dark"
      avatarProps={{
        title: <Avatar />,
        src: <UserOutlined className="!text-gray-500" />,
        render: (_: any, dom: any) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                    onClick: () => console.log('退出'),
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      title="doctor-dog"
      location={{ pathname }}
      menuItemRender={(item: any, dom: any) => (
        <NavLink to={item.key!}>{dom}</NavLink>
      )}
      css={style}
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
      {/* <Footer></Footer> */}
    </ProLayout>
  );
}
