import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Dimmer, Header, Image, Loader, Table } from 'semantic-ui-react';

import { FETCH_USERS_DATA_QUERY } from '../util/graphql';

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  const { loading, data } = useQuery(FETCH_USERS_DATA_QUERY);

  useEffect(() => {
    if (data) {
      setUsers(data.getUsers);
    }
  }, [data]);

  return loading ? (
    <Dimmer active inverted>
      <Loader>Cargando Usuarios...</Loader>
    </Dimmer>
  ) : (
    <Table striped celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={3}>Nombre del Usuario</Table.HeaderCell>
          <Table.HeaderCell>Usuario</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Teléfono</Table.HeaderCell>
          <Table.HeaderCell width={2}>Opciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.getUsers &&
          data.getUsers.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Header as='h4' image>
                  <Image
                    src={
                      user.genero === 'Femenino' ? '/images/female-profile-image.png' : '/images/male-profile-image.jpg'
                    }
                    rounded
                    size='mini'
                  />
                  <Header.Content>
                    {user.username}
                    <Header.Subheader>{user.perfil}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{user.nombre}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.telefono}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button positive>Editar</Button>
                  <Button.Or text='O' />
                  <Button negative>Eliminar</Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default UsersTable;
