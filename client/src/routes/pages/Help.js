import React from 'react';
import { Collapse } from 'antd';
import Content from '../../components/Content';

const { Panel } = Collapse;

export default () => (
  <Content title="Pomoc">
    <Collapse defaultActiveKey={['1']}>
      <Panel header="Jak zainstalować kody na swojej stronie?" key="1">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem
          culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus
          asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?
        </p>
      </Panel>

      <Panel header="Jak to działa?" key="2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem
          culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus
          asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?
        </p>
      </Panel>

      <Panel header="Czy skrypt wymaga jQuery?" key="3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem
          culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus
          asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?
        </p>
      </Panel>

      <Panel header="Jak zainstalować kod w aplikacji mobilnej?" key="4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem
          culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus
          asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?
        </p>
      </Panel>

      <Panel header="Jak usunąć swoje dane?" key="5">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem
          culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus
          asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?
        </p>
      </Panel>

      <Panel header="Co to jest kod śledzący?" key="6">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem
          culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus
          asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?
        </p>
      </Panel>
    </Collapse>
  </Content>
);
