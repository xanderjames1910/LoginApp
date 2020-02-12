import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../context/auth';

import UsersTable from '../components/UsersTable';

toast.configure({
  autoClose: 3500,
  draggable: true,
  hideProgressBar: true,
});

const AdminSettings = () => {
  const { user } = useContext(AuthContext);

  const notify = () => toast.success('Wow so easy !');

  const [open, setOpen] = useState(false);

  const show = () => () => setOpen(true);
  const close = () => setOpen(false);

  if (!user.perfil) {
    
    return <Redirect to='/' />;
  }

  return (
    <div>
      <Card style={{ width: '100%' }}>
        <Card.Content header='Listado de Usuarios' />
        <Card.Content style={{ minHeight: 350 }}>
          <UsersTable />
        </Card.Content>
        <Card.Content extra>
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={show(true)}>
            <Icon name='user' /> Añadir Usuario
          </Button>
        </Card.Content>
      </Card>
      <button onClick={notify}>Notify !</button>
    </div>
  );
};

export default AdminSettings;
