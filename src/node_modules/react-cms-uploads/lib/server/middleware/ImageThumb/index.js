'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var sharp = require('sharp');
var fs = require('fs');

var ImageThumbMiddleware = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var _req$params, src, type, path, abthPath, img;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:



            _req$params = req.params, src = _req$params[0], type = _req$params.type;





            path = '/uploads/' + src;

            // const abthPath = __dirname + path;

            abthPath = process.cwd() + path;





            if (!fs.existsSync(abthPath)) {
              _context.next = 24;
              break;
            }

            // Do something


            _context.next = 12;
            return sharp(abthPath);

          case 12:
            img = _context.sent;
            _context.t0 = type;
            _context.next = _context.t0 === 'avatar' ? 16 : 18;
            break;

          case 16:

            img.resize(200, 200);

            return _context.abrupt('break', 20);

          case 18:

            res.status(500);
            res.send("Wrong image type");

          case 20:

            img.withMetadata().toFormat('jpeg', {
              quality: 90
            }).toBuffer().then(function (data) {


              res.status(200);
              res.contentType("image/jpeg");
              res.send(data);
            }).catch(function (e) {
              console.error(e);

              res.status(500);
              res.send(e);
            });



            // res.sendFile(abthPath);
            // res.send('src');
            res.end(img);
            _context.next = 26;
            break;

          case 24:
            console.error("File not exists");

            res.status(404).send('File not found');

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function ImageThumbMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = ImageThumbMiddleware;