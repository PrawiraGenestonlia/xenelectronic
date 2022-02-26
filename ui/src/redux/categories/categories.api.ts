export type IAPI = 'getAllCategories' | 'createCategory' | 'getOneCategory' | 'updateOneCategory' | 'deleteOneCategory';

export const API: { [index: string]: { method: string, endpoint: string } } = {
  getAllCategories: {
    method: 'GET',
    endpoint: '/api/categories'
  },
  createCategory: {
    method: 'POST',
    endpoint: '/api/categories'
  },
  getOneCategory: {
    method: 'GET',
    endpoint: '/api/categories/{categoryName}'
  },
  updateOneCategory: {
    method: 'PUT',
    endpoint: '/api/categories/{id}'
  },
  deleteOneCategory: {
    method: 'PUT',
    endpoint: '/api/categories/{id}'
  }
};
