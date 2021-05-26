const shopController = require('../../controllers/shop.controller');
const productController = require('../../controllers/product.controller');
const invoiceController = require('../../controllers/invoice.controller');
const { authCheck } = require('../../helpers/middlewares/tokenHandler');
const checkShopOwner = require('../../helpers/middlewares/checkShopOwner');
const { validateBody } = require('../../helpers/middlewares/schemaChecker');

const allows = 'owner';

module.exports = (router) => {
  router.post('/', authCheck(allows), validateBody('shop'), shopController.registerShop);
  router.get('/', authCheck(allows), shopController.findOwnerShops);
  router.get('/:shopId', authCheck(allows), shopController.ownerShopDetail);
  router.put('/:shopId', authCheck(allows), validateBody('shop'), shopController.updateShop);
  router.delete('/:shopId', authCheck(allows), shopController.deleteShop);
  router.post('/:shopId/invoice',
    authCheck(allows),
    validateBody('invoice'),
    checkShopOwner,
    invoiceController.createNewInvoice);
  router.get('/:shopId/invoice',
    authCheck(allows),
    checkShopOwner,
    invoiceController.getShopInvoices);
  router.get('/:shopId/invoice/:invoiceId',
    authCheck(allows),
    checkShopOwner,
    invoiceController.getShopInvoiceDetails);
  router.post('/:shopId/product',
    authCheck(allows),
    validateBody('product'),
    checkShopOwner,
    productController.addNewProduct);
  router.get('/:shopId/product',
    authCheck(allows),
    checkShopOwner,
    productController.listShopProducts);
  router.get('/:shopId/product/:productId',
    authCheck(allows),
    checkShopOwner,
    productController.getProductDetails);
  router.put('/:shopId/product/:productId',
    authCheck(allows),
    validateBody('product'),
    checkShopOwner,
    productController.updateProductDetails);
  router.delete('/:shopId/product/:productId',
    authCheck(allows),
    checkShopOwner,
    productController.deleteShopProduct);
};
