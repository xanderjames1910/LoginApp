const usersResolvers = require('./users');
const invoicesResolvers = require('./invoices');
const itemsResolvers = require('./items');

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...invoicesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...invoicesResolvers.Mutation,
    ...itemsResolvers.Mutation,
  },
};
