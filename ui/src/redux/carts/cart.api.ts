export type IAPI = 'getMyCart' | 'addToCart' | 'removeFromCart' | 'checkout';

export const API: { [index: string]: { method: string, endpoint: string } } = {
  getMyCart: {
    method: 'GET',
    endpoint: '/api/carts/{name}'
  },
  addToCart: {
    method: 'POST',
    endpoint: '/api/carts/add'
  },
  removeFromCart: {
    method: 'POST',
    endpoint: '/api/carts/remove'
  },
  checkout: {
    method: 'POST',
    endpoint: '/api/carts/checkout/{name}'
  }
};
