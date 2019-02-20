import React, { useContext } from 'react';
import { Alert } from 'antd';
import AlertContext from '../contexts/Alert';

export default () => {
  const { alerts = [] } = useContext(AlertContext);

  return (
    <div className="alerts">
      {alerts.length > 0 && alerts.map(item => <Alert key={item.id} {...item} showIcon />)}
    </div>
  );
};
