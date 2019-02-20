import React, { useState, useEffect, createContext } from 'react';
import nanoid from 'nanoid';

const AlertContext = createContext({});

export const { Consumer } = AlertContext;

export const Provider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const timer = setInterval(removeTimeouted, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  const onClose = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const removeTimeouted = () => {
    setAlerts(
      alerts.filter(({ timeout }) => {
        if (!timeout) return true;
        return timeout >= Date.now();
      })
    );
  };

  const addAlert = (type, message, closable = true, timeout = 5000) => {
    setAlerts([
      ...alerts,
      {
        id: nanoid(),
        type,
        message,
        closable,
        onClose,
        timeout: timeout ? Date.now() + Number(timeout) : undefined
      }
    ]);
  };

  return (
    <AlertContext.Provider
      value={{
        onClose,
        addAlert,
        alerts
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
