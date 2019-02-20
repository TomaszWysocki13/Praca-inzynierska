import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Input, Form, Col, Row, Button, Divider
} from 'antd';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useForm from '../../hooks/useForm';
import AlertContext from '../../contexts/Alert';
import Alerts from '../../components/Alerts';

export default ({ history }) => {
  useDocumentTitle('Rejestracja');

  const initialValues = {
    username: '',
    email: '',
    password: '',
    repassword: ''
  };

  const { addAlert } = useContext(AlertContext);

  const [loading, setLoading] = useState(false);
  const { values, onChange } = useForm(initialValues);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post('/user/register', values)
      .then((res) => {
        addAlert('success', res.data.message);
        history.push('/');
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
            <h2>Rejestracja</h2>
          </Divider>

          <Alerts />

          <Form.Item label="Nazwa użytkownika" {...errors.username}>
            <Input value={values.username} onChange={e => onChange('username', e.target.value)} />
          </Form.Item>

          <Form.Item label="Adres e-mail" {...errors.email}>
            <Input value={values.email} onChange={e => onChange('email', e.target.value)} />
          </Form.Item>

          <Form.Item label="Hasło" {...errors.password}>
            <Input
              value={values.password}
              type="password"
              onChange={e => onChange('password', e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Powtórz hasło" {...errors.repassword}>
            <Input
              value={values.repassword}
              type="password"
              onChange={e => onChange('repassword', e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Zarejestruj się
            </Button>

            <div className="text-center">
              Masz już konto? <Link to="/logowanie">Zaloguj się!</Link>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
