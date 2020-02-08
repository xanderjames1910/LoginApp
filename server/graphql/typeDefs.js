const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    nombre: String!
    cedula: String!
    telefono: String!
    username: String!
    email: String!
    genero: String!
    perfil: String!
    direccion: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    nombre: String!
    cedula: String!
    telefono: String!
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
    genero: String!
    perfil: String!
    direccion: String!
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
