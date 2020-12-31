const productAction = require('../actions/product.action');
const responseBuilder = require('../helpers/responseBuilder');
const httpStatus = require('../libs/constants/httpStatus');

exports.addNewProduct = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { productName } = req.body;
    const body = {
      ...req.body,
      shopId
    };

    const checkProductNameExist = await productAction
      .findOneProduct({ where: { shopId, productName } });
    if (checkProductNameExist) return responseBuilder(res, 'product name already exist', httpStatus.CONFLICT);

    const message = await productAction.createProduct(body);

    return responseBuilder(res, message, httpStatus.CREATED);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.listShopProducts = async (req, res) => {
  try {
    const { shopId } = req.params;
    const data = await productAction.findAllProducts({ where: { shopId } });

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const { shopId, productId } = req.params;
    const data = await productAction.findOneProduct({ where: { productId, shopId } });

    if (!data) return responseBuilder(res, 'product not found', httpStatus.NOT_FOUND);

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.updateProductDetails = async (req, res) => {
  try {
    const { shopId, productId } = req.params;
    const { productName } = req.body;
    const product = await productAction.findOneProduct({ where: { productId, shopId } });

    if (!product) return responseBuilder(res, 'product not found', httpStatus.NOT_FOUND);

    const checkProductNameExist = await productAction
      .findOneProduct({ where: { productName, shopId } });

    if (checkProductNameExist) return responseBuilder(res, 'product name already exist', httpStatus.CONFLICT);

    const body = {
      ...product,
      ...req.body
    };

    const message = await productAction.updateProduct(body, { where: { productName, shopId } });

    return responseBuilder(res, message);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.deleteShopProduct = async (req, res) => {
  try {
    const { shopId, productId } = req.params;
    const checkProductExist = await productAction.findOneProduct({ where: { shopId, productId } });
    if (!checkProductExist) return responseBuilder(res, 'product not found', httpStatus.NOT_FOUND);

    const message = await productAction.deleteProduct({ where: { shopId, productId } });

    return responseBuilder(res, message);
  } catch (e) {
    return responseBuilder(res, e);
  }
};
