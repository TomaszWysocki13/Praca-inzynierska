import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import plPL from 'antd/lib/locale-provider/pl_PL';
import 'moment/locale/pl';
import moment from 'moment';
import Route from './components/Route';
import Wrapper from './components/Wrapper';
import { Provider as AuthProvider } from './contexts/Auth';
import { Provider as AlertProvider } from './contexts/Alert';

// pages
import Home from './routes/pages/Home';
import Help from './routes/pages/Help';
import NotFound from './routes/pages/NotFound';

// auth
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import Logout from './routes/auth/Logout';

// service
import ServiceAdd from './routes/service/Add';
import ServiceEdit from './routes/service/Edit';
import ServiceStats from './routes/service/Stats';
import ServiceTop from './routes/service/Top';
import ServiceBrowsers from './routes/service/Browsers';
import ServiceEvents from './routes/service/Events';
import ServiceList from './routes/service/List';

// account
import Account from './routes/account/Show';
import AccountEdit from './routes/account/Edit';

import 'antd/dist/antd.css';
import './style.scss';

moment.locale('pl');

const App = () => (
  <LocaleProvider locale={plPL}>
    <AuthProvider>
      <AlertProvider>
        <BrowserRouter>
          <Wrapper>
            <Switch>
              <Route path="/" exact component={Home} authorized />
              <Route path="/logowanie" component={Login} unauthorized />
              <Route path="/rejestracja" component={Register} unauthorized />
              <Route path="/wyloguj" component={Logout} />
              <Route path="/serwisy" exact component={ServiceList} authorized />
              <Route path="/serwisy/dodaj" component={ServiceAdd} authorized />
              <Route path="/serwisy/edytuj/:id" component={ServiceEdit} authorized />
              <Route path="/serwisy/statystyki/:id" component={ServiceStats} authorized />
              <Route path="/serwisy/top/:id" component={ServiceTop} authorized />
              <Route path="/serwisy/przegladarki/:id" component={ServiceBrowsers} authorized />
              <Route path="/serwisy/zdarzenia/:id" component={ServiceEvents} authorized />
              <Route path="/konto" exact component={Account} authorized />
              <Route path="/konto/edytuj" component={AccountEdit} authorized />
              <Route path="/pomoc" component={Help} authorized />
              <Route component={NotFound} />
            </Switch>
          </Wrapper>
        </BrowserRouter>
      </AlertProvider>
    </AuthProvider>
  </LocaleProvider>
);

render(<App />, document.getElementById('root'));
