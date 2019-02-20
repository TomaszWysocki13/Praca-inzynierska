import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  DatePicker, Card, Button, Icon, Form, Select
} from 'antd';
import moment from 'moment';
import AreaChart from '../../components/AreaChart';
import Content from '../../components/Content';
import AuthContext from '../../contexts/Auth';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default ({ match }) => {
  const { id } = match.params;
  const { user } = useContext(AuthContext);

  const [time, setTime] = useState([moment().subtract(7, 'days'), moment()]);
  const [unit, setUnit] = useState('day');

  const [click, setClick] = useState({ loading: true, data: [] });
  const [view, setView] = useState({ loading: true, data: [] });
  const [buy, setBuy] = useState({ loading: true, data: [] });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchSingle = (key, data, setData) => {
    setData({ ...data, loading: true });

    const [from, to] = time;
    const format = date => moment(date).format('YYYYMMDD');

    axios
      .get(`/service/${id}/stats?type=${key}&unit=${unit}&from=${format(from)}&to=${format(to)}`, {
        headers: { token: user.token }
      })
      .then((res) => {
        setData({
          loading: false,
          data: res.data.data
        });
      });
  };

  const fetchAll = () => {
    fetchSingle('click', click, setClick);
    fetchSingle('view', view, setView);
    fetchSingle('buy', buy, setBuy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAll();
  };

  return (
    <Content title="Statystki">
      <Card title="Filtry">
        <Form onSubmit={handleSubmit}>
          <RangePicker
            onChange={value => setTime(value)}
            value={time}
            style={{ marginRight: 10 }}
          />

          <Select
            style={{ width: 100, marginRight: 10 }}
            onChange={value => setUnit(value)}
            value={unit}
          >
            <Option value="hour">Godziny</Option>
            <Option value="day">Dni</Option>
            <Option value="month">Miesiące</Option>
            <Option value="year">Lata</Option>
          </Select>

          <Button type="primary" htmlType="submit">
            <Icon type="filter" /> Filtruj
          </Button>
        </Form>
      </Card>

      <AreaChart title="Kliknęcia" loading={click.loading} data={click.data} />
      <AreaChart title="Wyświetlenia" loading={view.loading} data={view.data} color="#ff9c6e" />
      <AreaChart title="Zakupy" loading={buy.loading} data={buy.data} color="#73d13d" />
    </Content>
  );
};
