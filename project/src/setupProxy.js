const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "http://pikcha36.o-r.kr:8080",
            changeOrigin: true,
        })
    );
};