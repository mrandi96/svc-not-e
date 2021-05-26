const Joi = require('joi');
const responseBuilder = require('../responseBuilder');
const { BAD_REQUEST } = require('../../libs/constants/httpStatus');

const JoiObject = Joi.object().options({ abortEarly: false });

const userSchema = JoiObject.keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  fullName: Joi.string().required(),
  contactNumber: Joi.string().required(),
  address: Joi.string()
});

const productSchema = JoiObject.keys({
  productName: Joi.string().required(),
  productPrice: Joi.number().required()
});

const shopSchema = JoiObject.keys({
  shopName: Joi.string().required(),
  countryId: Joi.number().integer().required(),
  provinceId: Joi.number().integer().required(),
  regencyId: Joi.number().integer().required(),
  address: Joi.string().required(),
  contactNumber: Joi.string().required(),
  invoiceFormat: Joi.string()
});

const insideSchema = Joi.array().min(1).items(JoiObject.keys({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required()
}));

const outsideSchema = Joi.array().min(1).items(JoiObject.keys({
  productName: Joi.string().required(),
  productPrice: Joi.number().min(0).not(0).required()
    .error((errors) => {
      errors.forEach((e) => {
        const index = e.path[1];
        if (['any.invalid', 'number.min'].includes(e.code)) {
          e.message = `"products[${index}].productPrice" must be greater than 0`;
        }
      });
      return errors;
    }),
  quantity: Joi.number().integer().min(1).required()
}));

const invoiceSchema = JoiObject.keys({
  invoiceCode: Joi.string().required(),
  productInsertMode: Joi.string().valid('inside', 'outside').required(),
  customerName: Joi.string().required(),
  products: Joi.alternatives().conditional('productInsertMode', [
    { is: 'inside', then: insideSchema },
    { is: 'outside', then: outsideSchema }
  ])
});

const getSchema = (schemaName) => {
  switch (schemaName) {
    case 'user': return userSchema;
    case 'product': return productSchema;
    case 'shop': return shopSchema;
    case 'invoice': return invoiceSchema;
    default: throw new Error('Schema not defined');
  }
};

/**
 * Middleware to be used to check json body passed from frontend
 * @param {('user'|'product'|'shop'|'invoice')} schemaName
 * - input with schema name defined in schemaChecker.js
 * @returns schema
 */
const validateBody = (schemaName) => {
  const schema = getSchema(schemaName);
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!error) return next();
    const { details } = error;
    const errorMessage = details.map(({ message }) => message).join(', ');

    const e = new Error(errorMessage);
    e.status = BAD_REQUEST;
    return responseBuilder(res, e);
  };
};

module.exports = {
  validateBody
};
