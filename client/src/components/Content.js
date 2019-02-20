import React from 'react';
import { Layout, Icon } from 'antd';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Alerts from './Alerts';

const { Content } = Layout;

export default ({ title, loading, children }) => {
  useDocumentTitle(title);

  return (
    <>
      <div className="headline">
        <h2>{title}</h2>
      </div>

      <Alerts />

      <Content className="content">
        {loading ? (
          <div className="loading">
            <Icon type="loading" size="large" />
          </div>
        ) : (
          children
        )}
      </Content>
    </>
  );
};
