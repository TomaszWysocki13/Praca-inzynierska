import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Card } from 'antd';
import Content from '../../components/Content';
import AuthContext from '../../contexts/Auth';
import AlertContext from '../../contexts/Alert';

export default ({ match }) => {
  const { id } = match.params;

  const { user } = useContext(AuthContext);
  const { addAlert } = useContext(AlertContext);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'User agent',
      dataIndex: 'browser'
    },
    {
      title: 'Ilość',
      dataIndex: 'count'
    }
  ];

  useEffect(() => {
    axios
      .get(`/service/${id}/browsers`, { headers: { token: user.token } })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(() => addAlert('error', 'Błąd ładowania strony, spróbuj ponownie'));
  }, []);

  return (
    <Content title="Najpopularniejsze przeglądarki" loading={loading}>
      <Card>
        <Table columns={columns} dataSource={data} />
      </Card>
    </Content>
  );
};
