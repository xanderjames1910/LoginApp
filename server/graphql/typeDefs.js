const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    nombre: String!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    nombre: String!
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
