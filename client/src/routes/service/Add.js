import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Input, Col, Form, Button, Checkbox, Card
} from 'antd';
import useForm from '../../hooks/useForm';
import Content from '../../components/Content';
import AuthContext from '../../contexts/Auth';
import AlertContext from '../../contexts/Alert';

export default ({ history }) => {
  const { user } = useContext(AuthContext);
  const { addAlert } = useContext(AlertContext);

  const { values, onChange } = useForm({
    name: '',
    uri: '',
    status: true
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post('/service', values, { headers: { token: user.token } })
      .then(() => {
        addAlert('success', 'Serwis został dodany');
        history.push('/serwisy');
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
    <Content title="Dodaj serwis">
      <Card>
        <Form onSubmit={handleSubmit}>
          <Col span={6}>
            <Form.Item label="Nazwa serwisu" {...errors.name}>
              <Input value={values.name} onChange={e => onChange('name', e.target.value)} />
            </Form.Item>

            <Form.Item label="Adres serwisu" {...errors.uri}>
              <Input value={values.uri} onChange={e => onChange('uri', e.target.value)} />
            </Form.Item>

            <Form.Item>
              <Checkbox
                checked={values.status}
                onChange={e => onChange('status', e.target.checked)}
              >
                Czy serwis ma być włączony?
              </Checkbox>
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
              Dodaj serwis
            </Button>
          </Col>
        </Form>
      </Card>
    </Content>
  );
};
