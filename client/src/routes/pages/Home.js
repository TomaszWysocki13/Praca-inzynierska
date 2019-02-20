import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, Row, Col, Statistic, Icon, Spin
} from 'antd';
import axios from 'axios';
import Content from '../../components/Content';
import AuthContext from '../../contexts/Auth';

export default () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState(0);
  const [events, setEvents] = useState(0);

  useEffect(() => {
    Promise.all([
      axios.get('/track/count', { headers: { token: user.token } }).then((res) => {
        setEvents(res.data.count);
      }),
      axios.get('/service/count', { headers: { token: user.token } }).then((res) => {
        setServices(res.data.count);
      })
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Content title="Strona główna">
      <Row gutter={15}>
        <Col span={10}>
          <Card title="Hej! Pare wskazówek dotyczących Trackio">
            <p>Do wygodnej obsługi aplikacji mogą Ci się przydać poniższe porady:</p>

            <ol>
              <li>
                Aby dodać serwis przejdź do zakładki <Link to="/serwisy">Serwisy</Link>.
              </li>
              <li>
                Aby połączyć swoją stronę internetową z Trackio skopiuj <code>kod śledzący</code> i
                wklej go na swojej stronie przed zamknięciem tagu <code>&lt;/body&gt;</code>
              </li>
              <li>
                Aby sprawdzić czy kod został poprawnie zainstalowany, przejdź do zakładki{' '}
                <Link to="/serwisy">Serwisy</Link> i kliknij przycisk{' '}
                <q>Sprawdź poprawność instalacji kodu</q>
              </li>
              <li>
                Klikając przycisk <code>Statystyki</code> na wybranym serwisie możesz sprawdzić
                statystyki dotyczące ruchu, wydarzeń oraz najczęściej wywoływanych stron.
              </li>
              <li>
                Odpowiedzi na najczęściej zadawane pytania znajdziesz w zakładce{' '}
                <Link to="/pomoc">Pomoc</Link>.
              </li>
            </ol>
          </Card>
        </Col>

        <Col span={4}>
          <Spin spinning={loading}>
            <Card>
              <Statistic
                title="Serwisy"
                value={services}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon type="global" />}
              />
            </Card>
          </Spin>

          <Spin spinning={loading}>
            <Card>
              <Statistic
                title="Wydarzenia"
                value={events}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon type="stock" />}
              />
            </Card>
          </Spin>
        </Col>
      </Row>
    </Content>
  );
};
