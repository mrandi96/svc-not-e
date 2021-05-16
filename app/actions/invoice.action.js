const { Invoice, InvoiceProduct } = require('../models');

exports.createInvoice = async (data, transaction) => {
  const query = await Invoice.create(data, { transaction });
  return query;
};

exports.findAllInvoice = async (options) => {
  const query = await Invoice.findAll({ ...options });
  return query;
};

exports.findOneInvoice = async (options) => {
  const query = await Invoice.findOne({ ...options });
  return query;
};

exports.updateInvoice = async (data, options) => {
  await Invoice.update(data, { ...options });
  return 'Invoice updated';
};

exports.deleteInvoice = async (options) => {
  await Invoice.destroy({ ...options });
  return 'Invoice deleted';
};

exports.nestedInvoice = async (shopId, invoiceId) => {
  const query = await Invoice.findOne({
    where: { shopId, invoiceId },
    include: [
      {
        model: InvoiceProduct,
        as: 'InvoiceProduct',
        include: ['Product']
      }
    ]
  }).then((item) => {
    if (!item) return null;
    return item.get({ plain: true });
  });

  return query;
};
