const proxy = require('http-proxy-middleware');

module.exports = router => {
  router.use(
    '/login',
    proxy({
      target: 'https://sso.jiwai.win',
      changeOrigin: true
    })
  );
};
