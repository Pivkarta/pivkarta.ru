const proxy = require('http-proxy-middleware');

const prismaProxy = require("@prisma-cms/front/lib/setupProxy");

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

  prismaProxy(app);

};
