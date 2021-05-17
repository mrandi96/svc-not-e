const shopController = require('../../controllers/shop.controller');
const productController = require('../../controllers/product.controller');
const invoiceController = require('../../controllers/invoice.controller');
const { authCheck } = require('../../helpers/tokenHandler');
const checkShopOwner = require('../../helpers/middlewares/checkShopOwner');

module.exports = (router) => {
  router.post('/', authCheck, shopController.registerShop);
  router.get('/', authCheck, shopController.findOwnerShops);
  router.get('/:shopId', authCheck, shopController.ownerShopDetail);
  router.put('/:shopId', authCheck, shopController.updateShop);
  router.delete('/:shopId', authCheck, shopController.deleteShop);

  router.post('/:shopId/invoice', authCheck, checkShopOwner, invoiceController.createNewInvoice);
  router.get('/:shopId/invoice', authCheck, checkShopOwner, invoiceController.getShopInvoices);
  router.get('/:shopId/invoice/:invoiceId', authCheck, checkShopOwner, invoiceController.getShopInvoiceDetails);

  router.post('/:shopId/product', authCheck, checkShopOwner, productController.addNewProduct);
  router.get('/:shopId/product', authCheck, checkShopOwner, productController.listShopProducts);
  router.get('/:shopId/product/:productId', authCheck, checkShopOwner, productController.getProductDetails);
  router.put('/:shopId/product/:productId', authCheck, checkShopOwner, productController.updateProductDetails);
  router.delete('/:shopId/product/:productId', authCheck, checkShopOwner, productController.deleteShopProduct);
};
