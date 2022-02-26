export type IAPI = 'getAllProducts' | 'createProduct' | 'getOneProduct' | 'getProductByCategory' | 'updateOneProduct' | 'deleteOneProduct';

export const API: { [index: string]: { method: string, endpoint: string } } = {
  getAllProducts: {
    method: 'GET',
    endpoint: '/api/products'
  },
  createProduct: {
    method: 'POST',
    endpoint: '/api/products'
  },
  getOneProduct: {
    method: 'GET',
    endpoint: '/api/products/{productName}'
  },
  getProductByCategory: {
    method: 'GET',
    endpoint: '/api/products/category/{categoryName}'
  },
  updateOneProduct: {
    method: 'PUT',
    endpoint: '/api/products/{id}'
  },
  deleteOneProduct: {
    method: 'PUT',
    endpoint: '/api/products/{id}'
  }
};
