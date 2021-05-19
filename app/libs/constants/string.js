const languageSupported = ['en', 'id'];
const { LANG = 'en' } = require('../../../config');

// Success
// -- Create
const create = (string) => ({
  en: `${string} created`,
  id: `${string} berhasil dibuat`
});

const createInvoice = {
  en: create('Invoice').en,
  id: create('Invoice').id
};

const createProduct = {
  en: create('Product').en,
  id: create('Produk').id
};

const createShop = {
  en: create('Shop').en,
  id: create('Toko').id
};

const createUser = {
  en: create('New user').en,
  id: create('Pengguna baru').id
};

// -- Update
const update = (string) => ({
  en: `${string} updated`,
  id: `${string} berhasil diperbaharui`
});

const updateInvoice = {
  en: update('Invoice').en,
  id: update('Faktur').id
};

const updateProduct = {
  en: update('Product').en,
  id: update('Produk').id
};

const updateShop = {
  en: update('Shop').en,
  id: update('Toko').id
};

const updateUser = {
  en: update('User').en,
  id: update('Pengguna').id
};

const updateUserPassword = {
  en: 'Change password success',
  id: 'Ganti password berhasil'
};

// -- Delete
const destroy = (string) => ({
  en: `${string} deleted`,
  id: `${string} berhasil dihapus`
});

const deleteInvoice = {
  en: destroy('Invoice').en,
  id: destroy('Faktur').id
};

const deleteProduct = {
  en: destroy('Product').en,
  id: destroy('Produk').id
};

const deleteShop = {
  en: destroy('Shop').en,
  id: destroy('Toko').id
};

const deleteUser = {
  en: destroy('User').en,
  id: destroy('Pengguna').id
};

// Error
// -- Not Found
const notFound = (string) => ({
  en: `${string} not found`,
  id: `${string} tidak ditemukan`
});

const notFoundCountry = {
  en: notFound('Country').en,
  id: notFound('Negara').id
};

const notFoundProvince = {
  en: notFound('Province').en,
  id: notFound('Provinsi').id
};

const notFoundRegency = {
  en: notFound('Regency').en,
  id: notFound('Kabupaten').id
};

const notFoundProduct = {
  en: notFound('Product(s)').en,
  id: notFound('Produk').id
};

const notFoundShop = {
  en: notFound('Shop').en,
  id: notFound('Toko').id
};

const notFoundUser = {
  en: 'User not registered',
  id: 'Pengguna belum terdaftar'
};

// -- Conflict
const conflict = (string) => ({
  en: `${string} already exist`,
  id: `${string} sudah terdaftar`
});

const conflictProduct = {
  en: conflict('Product name').en,
  id: conflict('Nama produk').id
};

const conflictShop = {
  en: conflict('Shop').en,
  id: conflict('Toko').id
};

const conflictUser = {
  en: 'User already registered',
  id: conflict('Pengguna').id
};

// -- UNAUTHORIZED
const unathorized = (string) => ({
  en: `${string} don't have access here`,
  id: `${string} tidak memiliki akses di sini`
});

const unauthorizedShop = {
  en: unathorized('You').en,
  id: unathorized('Anda').id
};

const unauthorizedUser = {
  en: 'Email/password is invalid',
  id: 'Periksa kembali email/password anda'
};

module.exports = (input) => {
  let lang = input;
  if (!languageSupported.includes(input)) lang = LANG;
  return {
    SUCCESS: {
      CREATE: {
        INVOICE: createInvoice[lang],
        PRODUCT: createProduct[lang],
        SHOP: createShop[lang],
        USER: createUser[lang]
      },
      UPDATE: {
        INVOICE: updateInvoice[lang],
        PRODUCT: updateProduct[lang],
        SHOP: updateShop[lang],
        USER: updateUser[lang],
        PASSWORD: updateUserPassword[lang]
      },
      DELETE: {
        INVOICE: deleteInvoice[lang],
        PRODUCT: deleteProduct[lang],
        SHOP: deleteShop[lang],
        USER: deleteUser[lang]
      }
    },
    ERROR: {
      NOT_FOUND: {
        COUNTRY: notFoundCountry[lang],
        PROVINCE: notFoundProvince[lang],
        REGENCY: notFoundRegency[lang],
        INVOICE: (invoiceCode) => notFound(invoiceCode)[lang],
        PRODUCT: notFoundProduct[lang],
        SHOP: notFoundShop[lang],
        USER: notFoundUser[lang]
      },
      CONFLICT: {
        INVOICE: (invoiceCode) => conflict(invoiceCode)[lang],
        PRODUCT: conflictProduct[lang],
        SHOP: conflictShop[lang],
        USER: conflictUser[lang]
      },
      UNAUTHORIZED: {
        SHOP: unauthorizedShop[lang],
        USER: unauthorizedUser[lang]
      }
    }
  };
};
