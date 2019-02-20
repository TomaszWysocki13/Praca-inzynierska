import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';
import AuthContext from '../contexts/Auth';

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/konto">Moje konto</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/wyloguj">Wyloguj</Link>
    </Menu.Item>
  </Menu>
);

export default () => {
  const { user } = useContext(AuthContext);

  return (
    <Dropdown.Button overlay={menu} placement="bottomRight" trigger={['click']}>
      <Link to="/konto">
        <Icon type="smile" theme="twoTone" /> {user.username}
      </Link>
    </Dropdown.Button>
  );
};
