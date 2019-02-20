import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Input, Col, Form, Button, Card
} from 'antd';
import useForm from '../../hooks/useForm';
import Content from '../../components/Content';
import AuthContext from '../../contexts/Auth';
import AlertContext from '../../contexts/Alert';

export default ({ match, history }) => {
  const { addAlert } = useContext(AlertContext);
  const { user } = useContext(AuthContext);

  const { values, onChange, setValues } = useForm({
    username: '',
    email: '',
    oldPassword: '',
    password: '',
    repassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/user', { headers: { token: user.token } })
      .then((res) => {
        setValues({ ...res.data.data });
        setLoading(false);
      })
      .catch(() => addAlert('error', 'Błąd ładowania strony, spróbuj ponownie'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .patch('/user', values, { headers: { token: user.token } })
      .then(() => {
        addAlert('success', 'Konto zostało zaktualizowane');
        history.push('/konto');
      })
      .catch((err) => {
        const { message } = err.response.data;

        if (message) {
          addAlert('error', message);
        } else {
          const list = {};

          err.response.data.errors.forEach((item) => {
            list[item.field] = {
              hasFeedback: true,
              validateStatus: 'error',
              help: item.message
            };
          });

          setErrors(list);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Content title="Edycja konta">
      <Card>
        <Form onSubmit={handleSubmit}>
          <Col span={6}>
            <Form.Item label="Nazwa użytkownika" {...errors.username}>
              <Input value={values.username} onChange={e => onChange('username', e.target.value)} />
            </Form.Item>

            <Form.Item label="Adres email" {...errors.email}>
              <Input value={values.email} onChange={e => onChange('email', e.target.value)} />
            </Form.Item>

            <Form.Item label="Stare hasło" {...errors.oldPassword}>
              <Input
                value={values.oldPassword}
                onChange={e => onChange('oldPassword', e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Nowe hasło" {...errors.password}>
              <Input value={values.password} onChange={e => onChange('password', e.target.value)} />
            </Form.Item>

            <Form.Item label="Powtórz nowe hasło" {...errors.repassword}>
              <Input
                value={values.repassword}
                onChange={e => onChange('repassword', e.target.value)}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
              Edytuj konto
            </Button>
          </Col>
        </Form>
      </Card>
    </Content>
  );
};
