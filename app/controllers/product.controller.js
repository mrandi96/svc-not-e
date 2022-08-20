const productAction = require('../actions/product.action');
const responseBuilder = require('../helpers/responseBuilder');

exports.addNewProduct = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { productName } = req.body;
    const payload = {
      ...req.body,
      shopId
    };

    const data = await productAction.createProduct(payload, { shopId, productName });

    return responseBuilder(res, data, true);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.listShopProducts = async (req, res) => {
  try {
    const { shopId } = req.params;
    const data = await productAction.findAllProducts({ shopId });

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const { shopId, productId } = req.params;
    const data = await productAction.findOneProduct({ productId, shopId });

    return responseBuilder(res, data);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.updateProductDetails = async (req, res) => {
  try {
    const { shopId, productId } = req.params;
    const { productName } = req.body;

    const message = await productAction
      .updateProduct(req.body, { productId, shopId }, { productName, shopId });

    return responseBuilder(res, message);
  } catch (e) {
    return responseBuilder(res, e);
  }
};

exports.deleteShopProduct = async (req, res) => {
  try {
    const { shopId, productId } = req.params;

    const message = await productAction.deleteProduct({ shopId, productId });

    return responseBuilder(res, message);
  } catch (e) {
    return responseBuilder(res, e);
  }
};
