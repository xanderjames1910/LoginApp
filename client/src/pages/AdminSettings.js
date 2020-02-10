import React, { useState } from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import AddPersonModal from './AddPersonModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UsersTable from '../components/UsersTable';

toast.configure({
  autoClose: 3500,
  draggable: true,
  hideProgressBar: true,
});

const AdminSettings = () => {
  const notify = () => toast.success('Wow so easy !');

  const [open, setOpen] = useState(false);

  const show = () => () => setOpen(true);
  const close = () => setOpen(false);
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
          <AddPersonModal open={open} close={close} />
        </Card.Content>
      </Card>
      <button onClick={notify}>Notify !</button>
    </div>
  );
};

export default AdminSettings;
