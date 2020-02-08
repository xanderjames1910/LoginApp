import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChangeSelect = (e, res) => {
    const { name, value } = res || e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    callback();
  };

  return {
    onChange,
    onChangeSelect,
    onSubmit,
    values,
  };
};
