const { AuthenticationError } = require('apollo-server');

const Invoice = require('../../models/Invoice');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getInvoices() {
      try {
        const invoices = await Invoice.find().sort({ createdAt: -1 });
        return invoices;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getInvoice(_, { invoiceId }) {
      try {
        const invoice = await Invoice.findById(invoiceId);
        if (invoice) {
          return invoice;
        } else {
          throw new Error('Documento no encontrado');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createInvoice(
      _,
      {
        invoiceInput: {
          documentType,
          clientName,
          clientId,
          clientEmail,
          clientPhoneNumber,
          clientAdress,
          discount,
          totalInvoiceAmount,
        },
      },
      context,
    ) {
      const user = checkAuth(context);

      const newInvoice = new Invoice({
        documentType,
        clientName,
        clientId,
        clientEmail,
        clientPhoneNumber,
        clientAdress,
        discount,
        totalInvoiceAmount,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const invoice = await newInvoice.save();

      return invoice;
    },
    async deleteInvoice(_, { invoiceId }, context) {
      const user = checkAuth(context);

      try {
        const invoice = await Invoice.findById(invoiceId);

        if (user.username === invoice.username) {
          await invoice.delete();
          return 'Documento eliminado satisfactoriamente';
        } else {
          throw new AuthenticationError('Acción no permitida');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
