import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Divider } from 'antd';
import Content from '../../components/Content';
import AuthContext from '../../contexts/Auth';

export default () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('/user', { headers: { token: user.token } }).then((res) => {
      setData(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <Content title="Moje konto" loading={loading}>
      <Card>
        <Link to="/konto/edytuj">
          <Button icon="edit">
            <span>Edycja konta</span>
          </Button>
        </Link>

        <Divider />

        <ul>
          <li>Nazwa użytkownika: {data.username}</li>
          <li>Adres email: {data.email}</li>
          <li>Data rejestracji: {data.createdAt}</li>
        </ul>
      </Card>
    </Content>
  );
};
