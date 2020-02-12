const { AuthenticationError, UserInputError } = require('apollo-server');

const Invoice = require('../../models/Invoice');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Mutation: {
    createItem: async (
      _,
      { invoiceId, itemInput: { quantity, description, individualItemAmount, totalItemAmount } },
      context,
    ) => {
      const { username } = checkAuth(context);

      const invoice = await Invoice.findById(invoiceId);

      if (invoice) {
        invoice.items.unshift({
          quantity,
          description,
          individualItemAmount,
          totalItemAmount,
          username,
          createdAt: new Date().toISOString(),
        });
        await invoice.save();
        return invoice;
      } else throw new UserInputError('Documento no encontrado');
    },
    async deleteItem(_, { invoiceId, itemId }, context) {
      const { username } = checkAuth(context);

      const invoice = await Invoice.findById(invoiceId);

      if (invoice) {
        const itemIndex = invoice.items.findIndex(i => i.id === itemId);

        if (invoice.items[itemIndex].username === username) {
          invoice.items.splice(itemIndex, 1);
          await invoice.save();
          return invoice;
        } else {
          throw new AuthenticationError('Acción no permitida');
        }
      } else throw new UserInputError('Item no encontrado');
    },
  },
};
