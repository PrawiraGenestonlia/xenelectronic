export type IAPI = 'getMyCart';

export const API: { [index: string]: { method: string, endpoint: string } } = {
  getMyCart: {
    method: 'GET',
    endpoint: '/api/carts/{name}'
  }
};
