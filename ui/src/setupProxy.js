const { createProxyMiddleware } = require('http-proxy-middleware');

// eslint-disable-next-line space-before-function-paren
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true
    })
  );
};
