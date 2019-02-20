import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Table, Card, Button,  Popover
} from 'antd';
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
      title: 'Typ',
      dataIndex: 'type'
    },
    {
      title: 'URI',
      dataIndex: 'uri'
    },
    {
      title: 'Użytkownik',
      dataIndex: 'user',
      render: (obj, fields) => {
        if (!obj) return '-';

        const content = (
          <>
            <h4>Informacje o użytkowniku</h4>

            <ul>
              <li>
                <b>Adres IP:</b> {obj.ip}
              </li>
              <li>
                <b>Przeglądarka:</b> {obj.browser}
              </li>
              <li>
                <b>Język:</b> {obj.language}
              </li>
              <li>
                <b>Kraj:</b> {obj.country}
              </li>
              <li>
                <b>Region:</b> {obj.region}
              </li>
              <li>
                <b>Miasto:</b> {obj.city}
              </li>
            </ul>
          </>
        );

        return (
          <Popover content={content} title="Informacje o użytkowniku">
            <Button type="default" size="small">
              Informacje o użytkowniku
            </Button>
          </Popover>
        );
      }
    },
    {
      title: 'Data zdarzenia',
      dataIndex: 'createdAt'
    }
  ];

  useEffect(() => {
    axios
      .get(`/service/${id}/events`, { headers: { token: user.token } })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(() => addAlert('error', 'Błąd ładowania strony, spróbuj ponownie'));
  }, []);

  return (
    <Content title="Lista zdarzeń" loading={loading}>
      <Card>
        <Table columns={columns} dataSource={data} />
      </Card>
    </Content>
  );
};
