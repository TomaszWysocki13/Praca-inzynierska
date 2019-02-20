import { useState } from 'react';

export default (initial = {}) => {
  const [values, set] = useState(initial);

  const setValues = (data) => {
    let result = { ...values };

    for (const [key, value] of Object.entries(data)) {
      if (Object.keys(initial).includes(key)) {
        result = { ...result, [key]: value };
      }
    }

    set(result);
  };

  const onChange = (name, value) => {
    setValues({ [name]: value });
  };

  return { values, onChange, setValues };
};
