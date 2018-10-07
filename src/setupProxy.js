const proxy = require('http-proxy-middleware');


module.exports = function (app) {

  app.use(proxy('/api/', {
    target: 'http://localhost:4100/',
    ws: true,
    pathRewrite: {
      "^/api/": "/"
    }
  }));

  app.use(proxy('/images/', {
    target: 'http://localhost:4100/',
    pathRewrite: {
      "^/images/resized/([^/]+)/uploads/(.+)": "/images/$1/$2",
    }
  }));

};
