import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/Auth';
import AlertContext from '../../contexts/Alert';

export default () => {
  const { logout } = useContext(AuthContext);
  const { addAlert } = useContext(AlertContext);

  useEffect(() => {
    addAlert('success', 'Zostałeś poprawnie wylogowany, zapraszamy ponownie');
    logout();
  });

  return <Redirect to="/logowanie" />;
};
