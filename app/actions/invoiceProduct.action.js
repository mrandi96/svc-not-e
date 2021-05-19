const { InvoiceProduct } = require('../models');
const STRING = require('../libs/constants/string');

exports.bulkCreateInvoiceProduct = async (data, transaction) => {
  await InvoiceProduct.bulkCreate(data, { transaction });
  return STRING().SUCCESS.CREATE.INVOICE;
};
