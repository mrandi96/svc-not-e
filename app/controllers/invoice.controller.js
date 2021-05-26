const sequelize = require('../database/sequelize');
const responseBuilder = require('../helpers/responseBuilder');
const invoiceAction = require('../actions/invoice.action');
const invoiceProductAction = require('../actions/invoiceProduct.action');
const productAction = require('../actions/product.action');
const { errorNotFound } = require('../helpers/errorHandler');
const STRING = require('../libs/constants/string');
const { CONFLICT } = require('../libs/constants/httpStatus');

const invoiceProductParser = (InvoiceProduct = [], mode) => InvoiceProduct.map(({
  invoiceProductId, productId, quantity, Product, ...rest
}) => {
  let productName = String(rest.productName);
  let productPrice = Number(rest.productPrice);
  if (mode === 'inside') {
    productName = String(Product.productName);
    productPrice = Number(Product.productPrice);
  }
  return {
    invoiceProductId,
    productName,
    productPrice,
    quantity
  };
});

exports.createNewInvoice = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { shopId } = req.params;

    const {
      invoiceCode, productInsertMode, customerName, products
    } = req.body;

    await invoiceAction.findOneInvoice({ shopId, invoiceCode }, CONFLICT);

    let totalPrice = 0;
    if (productInsertMode === 'inside') {
      const productIds = products.map(({ productId }) => productId);
      const productList = await productAction.findAllProducts({ productId: productIds });
      if (productIds.length !== productList.length) errorNotFound(STRING().ERROR.NOT_FOUND.PRODUCT);

      totalPrice = productList.reduce((currentTotal, item, index) => {
        const currentPrice = Number(item.productPrice) * Number(products[index].quantity);
        return currentTotal + currentPrice;
      }, 0);
    } else if (productInsertMode === 'outside') {
      totalPrice = products.reduce((currentTotal, item) => {
        const currentPrice = Number(item.productPrice) * Number(item.quantity);
        return currentTotal + currentPrice;
      }, 0);
    }

    const invoiceBody = {
      invoiceCode,
      shopId,
      customerName,
      productInsertMode,
      totalPrice
    };

    const { invoiceId } = await invoiceAction.createInvoice(invoiceBody, transaction);

    const invoiceProductBody = products.map((product) => {
      const {
        productId, productName, productPrice, quantity
      } = product;
      if (productInsertMode === 'inside') {
        return { productId, quantity, invoiceId };
      }
      return {
        productName,
        productPrice,
        quantity,
        invoiceId
      };
    });

    const message = await invoiceProductAction
      .bulkCreateInvoiceProduct(invoiceProductBody, transaction);

    transaction.commit();

    return responseBuilder(res, message, true);
  } catch (e) {
    transaction.rollback();
    return responseBuilder(res, e);
  }
};

exports.getShopInvoices = async (req, res) => {
  try {
    const { shopId } = req.params;
    const data = await invoiceAction.findAllInvoices({ shopId });

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getShopInvoiceDetails = async (req, res) => {
  try {
    const { shopId, invoiceId: id } = req.params;
    const query = await invoiceAction.nestedInvoice({ shopId, invoiceId: id });

    const {
      invoiceId, invoiceCode, totalPrice, productInsertMode,
      customerName, createdAt, InvoiceProduct
    } = query;

    const products = invoiceProductParser(InvoiceProduct, productInsertMode);

    const data = {
      invoiceId,
      invoiceCode,
      totalPrice,
      customerName,
      createdAt,
      products
    };

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};
