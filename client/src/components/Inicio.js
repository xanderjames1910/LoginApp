import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Icon } from 'semantic-ui-react';

import Login from '../pages/Login';
import Register from '../pages/Register';

const Inicio = () => {
  return (
    <div className='start-background-image'>
      <div className='start-background'>
        <Grid className='start-grid'>
          <Grid.Row>
            <Grid.Column computer={8} only='computer' />
            <Grid.Column mobile={16} computer={8}>
              <Grid className='centered-item' style={{ margin: 0 }}>
                <Grid.Row>
                  <Grid.Column className='start-icon'>
                    <Icon name='home' size='massive' color='blue' />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Button.Group className='centered-item'>
                      <Button className='start-btn' color='blue' as={Link} to='/login'>
                        Ingresa
                      </Button>
                      <Button.Or text='O' />
                      <Button positive className='start-btn' as={Link} to='/register'>
                        Regístrate
                      </Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default Inicio;
