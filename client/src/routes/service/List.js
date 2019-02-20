import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import copy from 'copy-text-to-clipboard';
import { Link } from 'react-router-dom';
import {
  Table, Button, Tooltip, Modal, Icon, Card, Spin
} from 'antd';
import moment from 'moment';
import Content from '../../components/Content';
import AuthContext from '../../contexts/Auth';
import AlertContext from '../../contexts/Alert';

const { confirm } = Modal;

export default () => {
  const { user } = useContext(AuthContext);
  const { addAlert } = useContext(AlertContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = () => {
    setLoading(true);

    axios.get('/service', { headers: { token: user.token } }).then((res) => {
      setData(res.data.data);
      setLoading(false);
    });
  };

  const copyScript = (id, uri) => {
    const { hostname, port } = window.location;

    const host = `//${hostname}${port ? `:${port}` : ''}`;

    const code = `
      <script src="${host}/tracker.js"></script>
      <script>
        const track = new Tracker("${host}", "${id}");

        <!-- Przykłady użycia -->
        track.event("view", "${uri.replace(/\/$/, '')}");
        track.event("buy", "${uri.replace(/\/$/, '')}/adres-strony");
      </script>
    `;

    copy(code);
    addAlert('success', 'Skrypt został poprawnie skopiowany');
  };

  const checkScript = (id) => {
    setLoading(true);

    axios
      .get(`/service/${id}/check`, { headers: { token: user.token } })
      .then(() => addAlert('success', 'Skrypt dodany prawidłowo'))
      .catch(() => addAlert('error', 'Skrypt nie został znaleziony na serwisie'))
      .finally(() => setLoading(false));
  };

  const deleteService = id => axios
    .delete(`/service/${id}`, { headers: { token: user.token } })
    .then(() => addAlert('success', 'Serwis został prawidłowo usunięty'))
    .catch(() => addAlert('error', 'Wystąpił błąd, serwis nie został usunięty'));

  const deleteServiceModal = (id, name) => {
    confirm({
      title: 'Potwierdzenie usunięcia',
      content: `Czy napewno chcesz usunąć serwis "${name}" i wszystkie jego dane?`,
      okText: 'Tak',
      okType: 'danger',
      cancelText: 'Nie',
      onOk() {
        deleteService(id);
        fetchAll();
      }
    });
  };

  const columns = [
    {
      title: 'Nazwa serwisu',
      dataIndex: 'name',
      key: 'name',
      render: (text, fields) => <Link to={`/serwisy/edytuj/${fields._id}`}>{text}</Link>
    },
    {
      title: 'Adres',
      dataIndex: 'uri',
      key: 'uri',
      render: uri => (
        <a href={uri} target="_blank" rel="noopener noreferrer">
          {uri}
        </a>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (status ? (
        <Icon type="check-circle" className="green" />
      ) : (
        <Icon type="close-circle" className="red" />
      ))
    },
    {
      title: 'Data utworzenia',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: value => moment(value).format('DD MMMM YYYY, HH:mm')
    },
    {
      title: 'Data aktualizacji',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: value => (value ? moment(value).format('DD MMMM YYYY, HH:mm') : '-')
    },
    {
      key: 'action',
      render: (text, fields) => (
        <div className="actions">
          <>
            <Link to={`/serwisy/edytuj/${fields._id}`}>
              <Tooltip title="Edytuj serwis">
                <Button icon="edit" size="small" />
              </Tooltip>
            </Link>

            <Link to={`/serwisy/statystyki/${fields._id}`}>
              <Tooltip title="Statystyki">
                <Button icon="area-chart" size="small" />
              </Tooltip>
            </Link>

            <Link to={`/serwisy/top/${fields._id}`}>
              <Tooltip title="Najpopularniejsze strony">
                <Button icon="ordered-list" size="small" />
              </Tooltip>
            </Link>

            <Link to={`/serwisy/przegladarki/${fields._id}`}>
              <Tooltip title="Najpopularniejsze przeglądarki">
                <Button icon="global" size="small" />
              </Tooltip>
            </Link>

            <Link to={`/serwisy/zdarzenia/${fields._id}`}>
              <Tooltip title="Lista zdarzeń">
                <Button icon="stock" size="small" />
              </Tooltip>
            </Link>

            <Tooltip title="Skopiuj skrypt śledzący">
              <Button
                icon="scissor"
                size="small"
                onClick={() => copyScript(fields._id, fields.uri)}
              />
            </Tooltip>

            <Tooltip title="Sprawdź poprawność instalacji kodu">
              <Button icon="check-circle" size="small" onClick={() => checkScript(fields._id)} />
            </Tooltip>

            <Tooltip title="Usuń serwis">
              <Button
                type="danger"
                size="small"
                icon="delete"
                onClick={() => deleteServiceModal(fields._id, fields.name)}
              />
            </Tooltip>
          </>
        </div>
      )
    }
  ];

  return (
    <Content title="Lista serwisów">
      <Card>
        <div className="box">
          <Link to="/serwisy/dodaj">
            <Button icon="plus-circle">
              <span>Dodaj serwis</span>
            </Button>
          </Link>
        </div>

        <Spin spinning={loading}>
          <Table columns={columns} dataSource={data} rowKey="_id" bordered />
        </Spin>
      </Card>
    </Content>
  );
};
