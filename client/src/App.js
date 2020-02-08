import React, { useContext, Fragment, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Container, Menu, Sidebar } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
// import 'semantic-ui-css/semantic.css';
import './App.css';

import { AuthContext } from './context/auth';
// import AuthRoute from './util/AuthRoute';

import MenuBar from './layout/MenuBar';
// import Home from './pages/Home';
import Register from './pages/Register';

import Login from './pages/Login';
import SideMenu from './layout/SideMenu';
import AdminSettings from './pages/AdminSettings';
import RegisterModal from './pages/RegisterModal';

const App = () => {
  const { user } = useContext(AuthContext);

  const [visible, setVisible] = useState(false);

  const sideBarToggle = () => {
    setVisible(!visible);
  };

  return (
    <Router>
      <Route exact path='/login' component={Login} />
      {!user ? (
        <Redirect to='/login' />
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
                  <Route exact path='/' component={AdminSettings} />
                  <Route exact path='/register-modal' component={RegisterModal} />
                  <Route exact path='/register' component={Register} />
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
