import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../contexts/Auth';

export default ({
  component: Component, unauthorized, authorized, ...rest
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (unauthorized && user) {
          return <Redirect to="/" />;
        }

        if (authorized && !user) {
          return <Redirect to="/logowanie" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};
