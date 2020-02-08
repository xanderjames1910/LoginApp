module.exports.validateRegisterInput = (
  nombre,
  cedula,
  telefono,
  username,
  email,
  password,
  confirmPassword,
  genero,
  perfil,
  direccion,
) => {
  const errors = {};
  if (nombre.trim() === '') {
    errors.nombre = 'El nombre no debe estar vacio.';
  }
  if (cedula.trim() === '') {
    errors.cedula = 'La cédula no debe estar vacia.';
  }
  if (telefono.trim() === '') {
    errors.telefono = 'El teléfono no debe estar vacio.';
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
  if (genero.trim() === '') {
    errors.genero = 'El genero no debe estar vacio.';
  }
  if (perfil.trim() === '') {
    errors.perfil = 'El perfil no debe estar vacio.';
  }
  if (direccion.trim() === '') {
    errors.direccion = 'La dirección de usuario no debe estar vacia.';
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
