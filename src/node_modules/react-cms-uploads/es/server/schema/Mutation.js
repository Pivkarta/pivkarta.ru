import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('fs'),
    createWriteStream = _require.createWriteStream,
    unlinkSync = _require.unlinkSync;

var all = require('promises-all').all;
var mkdirp = require('mkdirp');
var shortid = require('shortid');
// const lowdb = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
// const { GraphQLUpload } = require('apollo-upload-server')

var uploadDir = 'uploads';

var _require2 = require('react-cms-graphql-utils/src/auth'),
    getUserId = _require2.getUserId;

// const db = lowdb(new FileSync('db.json'))

// // Seed an empty DB
// db.defaults({ uploads: [] }).write()

// Ensure upload directory exists


mkdirp.sync(uploadDir);

var storeFS = function storeFS(_ref) {
  var stream = _ref.stream,
      filename = _ref.filename;

  var id = shortid.generate();

  var path = uploadDir + '/' + id + '-' + filename;

  return new Promise(function (resolve, reject) {
    return stream.on('error', function (error) {
      if (stream.truncated)
        // Delete the truncated file
        unlinkSync(path);
      reject(error);
    }).on('end', function () {
      return resolve({ id: id, path: path });
    }).pipe(createWriteStream(path));
  });
};

// const storeDB = file =>
//   db
//     .get('uploads')
//     .push(file)
//     .last()
//     .write()

var processUpload = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(upload, ctx, info) {
    var userId, _ref3, stream, filename, mimetype, encoding, _ref4, id, path, file;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:



            // return;

            userId = getUserId(ctx);
            _context.next = 3;
            return upload;

          case 3:
            _ref3 = _context.sent;
            stream = _ref3.stream;
            filename = _ref3.filename;
            mimetype = _ref3.mimetype;
            encoding = _ref3.encoding;
            _context.next = 10;
            return storeFS({ stream: stream, filename: filename });

          case 10:
            _ref4 = _context.sent;
            id = _ref4.id;
            path = _ref4.path;

            // return storeDB({ id, filename, mimetype, encoding, path })

            // const file = { id, filename, mimetype, encoding, path };

            file = void 0;

            if (!path) {
              _context.next = 17;
              break;
            }

            file = {
              filename: filename,
              mimetype: mimetype,
              encoding: encoding,
              path: path.replace(/^\.\//, ''),
              createdby: {
                connect: {
                  id: userId
                }
              }
            };



            return _context.abrupt('return', ctx.db.mutation.createFile({
              data: file
            }, info));

          case 17:
            return _context.abrupt('return', null);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function processUpload(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  // Upload: GraphQLUpload,
  // Query: {
  //   uploads: () => db.get('uploads').value()
  // },
  Mutation: {
    // singleUpload: (obj, { file }) => {
    singleUpload: function singleUpload(parent, args, ctx, info) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var upload;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                upload = args.file;
                _context2.next = 3;
                return processUpload(upload, ctx, info);

              case 3:
                return _context2.abrupt('return', _context2.sent);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },

    // multipleUpload: async (obj, { files }) => {
    multipleUpload: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(parent, args, ctx, info) {
        var files, _ref6, resolve, reject;

        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                files = args.files;
                _context3.next = 3;
                return all(files.map(function (upload) {
                  return processUpload(upload, ctx, info);
                }));

              case 3:
                _ref6 = _context3.sent;
                resolve = _ref6.resolve;
                reject = _ref6.reject;


                if (reject.length) {
                  reject.forEach(function (_ref7) {
                    var name = _ref7.name,
                        message = _ref7.message;
                    return (
                      // eslint-disable-next-line no-console
                      console.error(name + ': ' + message)
                    );
                  });
                }



                resolve = resolve && resolve
                // .map(n => {

                //   const {
                //     createFile: file,
                //   } = (n && n.data) || {};

                //   return file || null;

                // })
                .filter(function (n) {
                  return n;
                }) || null;



                // if(resolve && resolve.length){
                //   return;
                // }

                // // else 
                // return null;

                return _context3.abrupt('return', resolve);

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }));

      return function multipleUpload(_x4, _x5, _x6, _x7) {
        return _ref5.apply(this, arguments);
      };
    }()
  }
};