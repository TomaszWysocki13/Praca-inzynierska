import React, { useState, createContext } from 'react';

const AuthContext = createContext({});

export const { Consumer } = AuthContext;

export const Provider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || false);

  const login = (data) => {
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(false);
    localStorage.removeItem('user');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
