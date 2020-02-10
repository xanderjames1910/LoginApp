import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';

import Login from '../pages/Login';
import Register from '../pages/Register';

const Inicio = () => {
  return (
    <div className='start-background-image'>
      <div className='start-background'>
        <div className='centered-item'>
          {/* <Login /> */}
          <Button.Group>
            <Button className='start-btn' color='blue' as={Link} to='/login'>
              Ingresar
            </Button>
            <Button.Or text='O' />
            <Button positive className='start-btn' as={Link} to='/register'>
              Registrarse
            </Button>
          </Button.Group>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
