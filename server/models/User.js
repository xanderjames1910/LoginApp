const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  nombre: String,
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model('User', userSchema);
