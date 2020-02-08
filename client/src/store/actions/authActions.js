import { LOGIN, LOGOUT } from './types';

// LOGIN USER
export const login = userData => dispatch => {
  localStorage.setItem('jwtToken', userData.token);
  dispatch({
    type: LOGIN,
    payload: userData,
  });
};

// LOGOUT USER
export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  dispatch({
    type: LOGOUT,
  });
};
