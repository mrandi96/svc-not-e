const { Invoice, InvoiceProduct } = require('../models');
const STRING = require('../libs/constants/string');
const { NOT_FOUND, CONFLICT } = require('../libs/constants/httpStatus');
const { errorNotFound, errorConflict } = require('../helpers/errorHandler');

exports.createInvoice = async (data, transaction) => {
  const query = await Invoice.create(data, { transaction });
  return query;
};

exports.findAllInvoices = async (where) => {
  const query = await Invoice.findAll({
    where,
    order: [['createdAt', 'DESC']]
  });
  return query;
};

exports.findOneInvoice = async (where, type = NOT_FOUND) => {
  const query = await Invoice.findOne({ where });

  const { invoiceCode = 'Invoice' } = where;
  if (type === NOT_FOUND && !query) errorNotFound(STRING().ERROR.NOT_FOUND.INVOICE(invoiceCode));
  else if (type === CONFLICT && query) errorConflict(STRING().ERROR.CONFLICT.INVOICE(invoiceCode));

  return query;
};

exports.updateInvoice = async (data, where, conflictWhere) => {
  await this.findOneInvoice(where);
  await this.findOneInvoice(conflictWhere, CONFLICT);
  await Invoice.update(data, { where });

  return STRING().SUCCESS.UPDATE.INVOICE;
};

exports.deleteInvoice = async (options) => {
  await Invoice.destroy({ ...options });
  return STRING().SUCCESS.DELETE.INVOICE;
};

exports.nestedInvoice = async (where) => {
  const query = await Invoice.findOne({
    where,
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
  if (!query) errorNotFound(STRING().ERROR.NOT_FOUND.INVOICE);

  return query;
};
