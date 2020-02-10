import React, { useContext, Fragment, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Container, Menu, Sidebar } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
// import 'semantic-ui-css/semantic.css';
import './App.css';

import { AuthContext } from './context/auth';

import MenuBar from './layout/MenuBar';
import SideMenu from './layout/SideMenu';

import Inicio from './components/Inicio';

import AdminSettings from './pages/AdminSettings';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const { user } = useContext(AuthContext);

  const [visible, setVisible] = useState(false);

  const sideBarToggle = () => {
    setVisible(!visible);
  };

  return (
    <Router>
      <Route exact path='/inicio' component={Inicio} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      {!user ? (
        <Redirect to='/inicio' />
      ) : (
        <Fragment>
          <Sidebar.Pushable>
            <Sidebar as={Menu} animation='push' icon='labeled' inverted vertical visible={visible} width='thin'>
              <SideMenu />
            </Sidebar>
            <Sidebar.Pusher className={!visible ? '' : 'pusher-width-toggled'}>
              <Menu pointing color='blue' fixed='top'>
                <Menu.Item icon='bars' onClick={sideBarToggle} />
                <MenuBar sideBarToggle={sideBarToggle} />
              </Menu>
              <Container style={{ paddingTop: '4em' }}>
                <Switch>
                  {user.perfil === 'Administrador' ? (
                    <Route exact path='/settings' component={AdminSettings} />
                  ) : (
                    <Redirect to='/' />
                  )}
                </Switch>
              </Container>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Fragment>
      )}
    </Router>
  );
};

export default App;
