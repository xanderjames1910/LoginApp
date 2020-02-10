import React, { useContext, useState } from 'react';
import { Button, Card, Form, List, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

const Register = props => {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    nombre: '',
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
        <Card className='login-register-card'>
          <Card.Content>
            <Card.Header style={{ textAlign: 'center', marginBottom: 10 }}>Registro de Usuarios</Card.Header>
            <Form.Input
              label='Nombre'
              placeholder='Nombre completo'
              name='nombre'
              type='text'
              fluid
              value={values.nombre}
              error={errors.nombre ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label='Nombre de Usuario'
              placeholder='Nombre de Usuario'
              name='username'
              type='text'
              fluid
              value={values.username}
              error={errors.username ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label='Contraseña'
              placeholder='Contraseña'
              name='password'
              type='password'
              fluid
              value={values.password}
              error={errors.password ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label='Confirmar Contraseña'
              placeholder='Confirmar Contraseña'
              name='confirmPassword'
              type='password'
              fluid
              value={values.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label='Email'
              placeholder='Email'
              name='email'
              type='email'
              fluid
              value={values.email}
              error={errors.email ? true : false}
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
            <Button id='registerUserBtn' type='submit' fluid primary>
              Registrar Usuario
            </Button>
          </Card.Content>
        </Card>
      </Form>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $nombre: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        nombre: $nombre
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      nombre
      username
      email
    }
  }
`;

export default Register;
