const shopController = require('../../controllers/shop.controller');
const productController = require('../../controllers/product.controller');
const invoiceController = require('../../controllers/invoice.controller');
const { authCheck } = require('../../helpers/middlewares/tokenHandler');
const checkShopOwner = require('../../helpers/middlewares/checkShopOwner');

const allows = 'owner';

module.exports = (router) => {
  router.post('/', authCheck(allows), shopController.registerShop);
  router.get('/', authCheck(allows), shopController.findOwnerShops);
  router.get('/:shopId', authCheck(allows), shopController.ownerShopDetail);
  router.put('/:shopId', authCheck(allows), shopController.updateShop);
  router.delete('/:shopId', authCheck(allows), shopController.deleteShop);
  router.post('/:shopId/invoice',
    authCheck(allows),
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
    checkShopOwner,
    productController.updateProductDetails);
  router.delete('/:shopId/product/:productId',
    authCheck(allows),
    checkShopOwner,
    productController.deleteShopProduct);
};
