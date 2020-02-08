import jwtDecode from 'jwt-decode';

import { LOGIN, LOGOUT } from '../actions/types';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      console.log('Logout');
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
