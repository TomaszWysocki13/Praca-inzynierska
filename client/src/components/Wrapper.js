import React, { useState, useContext } from 'react';
import { Layout, Icon } from 'antd';
import Sidebar from './Sidebar';
import AuthContext from '../contexts/Auth';
import UserMenu from './UserMenu';

const { Header } = Layout;

export default ({ children, history }) => {
  const { user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const collapse = () => setCollapsed(prev => !prev);

  return user ? (
    <Layout>
      <Sidebar collapsed={collapsed} />

      <Layout>
        <Header className="header">
          <Icon
            className="sidebar-trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={collapse}
          />

          <div className="header-right">
            <UserMenu />
          </div>
        </Header>

        {children}
      </Layout>
    </Layout>
  ) : (
    children
  );
};
