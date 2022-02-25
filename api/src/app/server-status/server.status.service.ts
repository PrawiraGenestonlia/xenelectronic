/* Server Status service
 * Originally written by Prawira Genestonlia
 * Created on 25 Feb 2022
 */

import app from '../../app';

export interface IRoutes {
  path: string,
  stack: Array<{
    name: string,
    keys: Array<string>,
    regexp: { fast_star: boolean, fast_slash: boolean },
    method: string
  }>,
  methods: { [index: string]: boolean }
}[]

export const getRoutes = () => {
  return new Promise<IRoutes>((resolve, reject) => {
    try {
      let route: any;
      const routes: any = [];
      app._router.stack.forEach((middleware: any) => {
        if (middleware.route) { // routes registered directly on the app
          routes.push(middleware.route);
        } else if (middleware.name === 'router') { // router middleware 
          middleware.handle.stack.forEach((handler: any) => {
            route = handler.route;
            route && routes.push(route);
          });
        }
      });
      resolve(routes);
    } catch (e) {
      reject(e);
    }
  })
}