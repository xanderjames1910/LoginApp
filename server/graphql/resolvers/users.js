const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      perfil: user.perfil,
    },
    SECRET_KEY,
    { expiresIn: '1h' },
  );
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find().sort({ createdAt: -1 });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'El usuario no existe';
        throw new UserInputError('Usuario no encontrado', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Credenciales incorrectas';
        throw new UserInputError('Credenciales incorrectas', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(_, { registerInput: { nombre, username, email, password, confirmPassword } }) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(nombre, username, email, password, confirmPassword);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // TODO: Make sure user doesnt already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('El usuario ya existe', {
          errors: {
            username: 'Éste usuario ya se encuentra registrado.',
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        nombre,
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
