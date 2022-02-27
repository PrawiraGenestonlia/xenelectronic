export type IAPI = 'login';

export const API: { [index: string]: { method: string, endpoint: string } } = {
  login: {
    method: 'POST',
    endpoint: '/api/users/login'
  }
};
