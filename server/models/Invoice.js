const { model, Schema } = require('mongoose');

const invoiceSchema = new Schema({
  documentType: String,
  documentNumber: String,
  clientName: String,
  clientId: String,
  clientEmail: String,
  clientPhoneNumber: String,
  clientAdress: String,
  items: [
    {
      quantity: String,
      description: String,
      individualItemAmount: String,
      totalItemAmount: String,
      username: String,
      createdAt: String,
    },
  ],
  discount: String,
  totalInvoiceAmount: String,
  createdAt: String,
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = model('Invoice', invoiceSchema);
