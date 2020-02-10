module.exports.validateRegisterInput = (nombre, username, email, password, confirmPassword) => {
  const errors = {};
  if (nombre.trim() === '') {
    errors.nombre = 'El nombre no debe estar vacio.';
  }
  if (username.trim() === '') {
    errors.username = 'El nombre de usuario no debe estar vacio.';
  }
  if (email.trim() === '') {
    errors.email = 'El email no debe estar vacio.';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'El email debe ser un email valido.';
    }
  }
  if (password === '') {
    errors.password = 'La contraseña no debe estar vacia.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Las contraseñas deben coincidir';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'El nombre de usuario no debe estar vacio.';
  }
  if (password.trim() === '') {
    errors.password = 'La contraseña no debe estar vacia.';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
