const sequelize = require('../database/sequelize');
const responseBuilder = require('../helpers/responseBuilder');
const invoiceAction = require('../actions/invoice.action');
const invoiceProductAction = require('../actions/invoiceProduct.action');
const productAction = require('../actions/product.action');
const { NOT_FOUND, CONFLICT } = require('../libs/constants/httpStatus');

exports.createNewInvoice = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { shopId } = req.params;

    const {
      invoiceCode, productInsertMode, customerName, products
    } = req.body;

    const checkInvoiceExist = await invoiceAction
      .findOneInvoice({ where: { shopId, invoiceCode } });
    if (checkInvoiceExist) {
      const e = new Error(`${invoiceCode} already exist`);
      e.status = CONFLICT;
      throw e;
    }

    let totalPrice = 0;
    if (productInsertMode === 'inside') {
      const productIds = products.map(({ productId }) => productId);
      const productList = await productAction.findAllProducts({ where: { productId: productIds } });
      if (productIds.length !== productList.length) {
        const e = new Error('Product(s) not found');
        e.status = NOT_FOUND;
        throw e;
      }

      totalPrice = productList.reduce((currentTotal, item, index) => {
        const currentPrice = +item.productPrice * +products[index].quantity;
        return currentTotal + currentPrice;
      }, 0);
    } else if (productInsertMode === 'outside') {
      totalPrice = products.reduce((currentTotal, item) => {
        const currentPrice = +item.productPrice * +item.quantity;
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

    await invoiceProductAction.bulkCreateInvoiceProduct(invoiceProductBody, transaction);

    transaction.commit();

    return responseBuilder(res, 'Invoice created', true);
  } catch (e) {
    transaction.rollback();
    return responseBuilder(res, e);
  }
};

exports.getShopInvoices = async (req, res) => {
  try {
    const { shopId } = req.params;
    const data = await invoiceAction.findAllInvoices({
      where: { shopId },
      order: [['createdAt', 'DESC']]
    });

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getShopInvoiceDetails = async (req, res) => {
  try {
    const { shopId, invoiceId: id } = req.params;
    const query = await invoiceAction.nestedInvoice(shopId, id);
    if (!query) {
      const e = new Error('Invoice not found');
      e.status = NOT_FOUND;
      throw e;
    }

    const {
      invoiceId, invoiceCode, totalPrice, productInsertMode, customerName, createdAt, InvoiceProduct
    } = query;

    const products = InvoiceProduct.map(({
      invoiceProductId, productId, quantity, Product, ...rest
    }) => {
      let productName = String(rest.productName);
      let productPrice = Number(rest.productPrice);
      if (productInsertMode === 'inside') {
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
