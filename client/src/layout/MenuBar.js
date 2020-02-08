import React, { useContext, useState } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// import { logout } from '../store/actions/authActions';

import { AuthContext } from '../context/auth';

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  // console.log(user);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Container>
      <Menu.Menu position='right'>
        <Menu.Item name='salir' onClick={logout} />
      </Menu.Menu>
    </Container>
  ) : (
    <Container>
      <Menu.Item name='inicio' active={activeItem === 'inicio'} onClick={handleItemClick} as={Link} to='/' />
      <Menu.Menu position='right'>
        <Menu.Item
          className='right-menu-border'
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
      </Menu.Menu>
    </Container>
  );

  return menuBar;
};

// const mapDispatchToProps = dispatch => {
//   return {
//     logout: () => dispatch(logout()),
//   };
// };

// export default connect(null, mapDispatchToProps)(MenuBar);
export default MenuBar;
