import React, { useContext, useState } from 'react';
import { Card, Button, Form, List, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

const Register = props => {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div>
      <Form className={loading ? 'loading centered-item' : 'centered-item'} onSubmit={onSubmit} noValidate>
        <Card style={{ width: 390 }}>
          <Card.Content>
            <Card.Header style={{ textAlign: 'center', marginBottom: 10 }}>Registro de Usuarios</Card.Header>
            <Form.Input
              label='Nombre de Usuario'
              placeholder='Nombre de Usuario'
              name='username'
              type='text'
              value={values.username}
              error={errors.username ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label='Email'
              placeholder='Email'
              name='email'
              type='email'
              value={values.email}
              error={errors.email ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label='Contraseña'
              placeholder='Contraseña'
              name='password'
              type='password'
              value={values.password}
              error={errors.password ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label='Confirmar Contraseña'
              placeholder='Confirmar Contraseña'
              name='confirmPassword'
              type='password'
              value={values.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={onChange}
            />
            {Object.keys(errors).length > 0 && (
              <Message negative>
                <List bulleted>
                  {Object.values(errors).map(value => (
                    <List.Item key={value}>{value}</List.Item>
                  ))}
                </List>
              </Message>
            )}
          </Card.Content>
          <Card.Content extra>
            <Button type='submit' primary>
              Registrar Usuario
            </Button>
          </Card.Content>
        </Card>
      </Form>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(
      registerInput: { username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
