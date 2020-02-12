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
  type Invoice {
    id: ID!
    documentType: String!
    documentNumber: String!
    clientName: String!
    clientId: String!
    clientEmail: String!
    clientPhoneNumber: String!
    clientAdress: String!
    items: [Items]!
    discount: String!
    totalInvoiceAmount: String!
    createdAt: String!
    username: String!
  }
  type Items {
    id: ID!
    quantity: String!
    description: String!
    individualItemAmount: String!
    totalItemAmount: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    nombre: String!
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  input InvoiceInput {
    documentType: String!
    clientName: String!
    clientId: String!
    clientEmail: String!
    clientPhoneNumber: String!
    clientAdress: String!
    discount: String!
    totalInvoiceAmount: String!
  }
  input ItemInput {
    quantity: String!
    description: String!
    individualItemAmount: String!
    totalItemAmount: String!
  }
  type Query {
    getUsers: [User]
    getInvoices: [Invoice]
    getInvoice(invoiceId: ID!): Invoice
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createInvoice(invoiceInput: InvoiceInput): Invoice!
    deleteInvoice(invoiceId: ID!): String!
    createItem(invoiceId: String!, itemInput: ItemInput): Invoice!
    deleteItem(invoiceId: ID!, itemId: ID!): Invoice!
  }
`;
