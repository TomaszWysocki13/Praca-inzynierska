import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  Input, Form, Col, Row, Button, Divider
} from 'antd';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useForm from '../../hooks/useForm';
import Alerts from '../../components/Alerts';
import AuthContext from '../../contexts/Auth';
import AlertContext from '../../contexts/Alert';

export default () => {
  useDocumentTitle('Logowanie');

  const { addAlert } = useContext(AlertContext);
  const { login } = useContext(AuthContext);

  const { values, onChange } = useForm({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post('/user/login', values)
      .then((res) => {
        const { message, token } = res.data;
        const user = jwt.decode(token);

        login({ token, ...user });

        addAlert('success', message);
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
    <Row type="flex" justify="center" align="middle" className="wrapper fullHeight">
      <Col span={7}>
        <Form onSubmit={handleSubmit}>
          <Divider>
            <h3>Logowanie</h3>
          </Divider>

          <Alerts />

          <Form.Item label="Nazwa użytkownika" {...errors.username}>
            <Input value={values.username} onChange={e => onChange('username', e.target.value)} />
          </Form.Item>

          <Form.Item label="Hasło" {...errors.password}>
            <Input
              value={values.password}
              type="password"
              onChange={e => onChange('password', e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Zaloguj się
            </Button>

            <div className="text-center">
              Nie masz konta? Przejdź do <Link to="/rejestracja">rejestracji</Link>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
