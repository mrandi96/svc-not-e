const { InvoiceProduct } = require('../models');

exports.bulkCreateInvoiceProduct = async (data, transaction) => {
  await InvoiceProduct.bulkCreate(data, { transaction });
  return 'invoice product created';
};
