import React, { useState, useEffect } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default ({ collapsed, ...rest }) => {
  const [active, setActive] = useState();

  useEffect(() => {
    setActive(window.location.pathname);
  });

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        <Link to="/">
          Track<b>io</b>
        </Link>
      </div>

      <Menu theme="dark" mode="inline" selectedKeys={[active]}>
        <Menu.Item key="/">
          <Link to="/">
            <Icon type="home" />
            <span>Strona główna</span>
          </Link>
        </Menu.Item>

        <SubMenu
          key="/serwisy"
          title={(
            <span>
              <Icon type="bars" />
              <span>Serwisy</span>
            </span>
)}
        >
          <Menu.Item key="/serwisy">
            <Link to="/serwisy">
              <span>Lista serwisów</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/serwisy/dodaj">
            <Link to="/serwisy/dodaj">
              <span>Dodaj nowy</span>
            </Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="/pomoc">
          <Link to="/pomoc">
            <Icon type="solution" />
            <span>Pomoc</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/konto">
          <Link to="/konto">
            <Icon type="user" />
            <span>Moje konto</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/wyloguj">
          <Link to="/wyloguj">
            <Icon type="logout" />
            <span>Wyloguj</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
