"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Scraping = /*#__PURE__*/function () {
  function Scraping() {
    _classCallCheck(this, Scraping);
  }

  _createClass(Scraping, [{
    key: "getDolarPrice",
    value: function () {
      var _getDolarPrice = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _yield$axios$get, data, elements, dolarPrice;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].get('https://exchangemonitor.net/dolar-venezuela');

              case 2:
                _yield$axios$get = _context.sent;
                data = _yield$axios$get.data;
                elements = data.split('<div class="col-xs-12 col-sm-6 col-md-4 col-tabla">');
                dolarPrice = [];
                elements.map(function (ele, i) {
                  if (i > 0) {
                    var keyname = ele.split('<h6 class="nombre" itemprop="name">')[1].split('</h6>')[0];
                    var price = ele.split('<p class="precio" itemprop="price">')[1].split('</p>')[0];
                    dolarPrice.push({
                      keyname: keyname.toLowerCase(),
                      price: price.replace(',', '.')
                    });
                  }
                });
                return _context.abrupt("return", dolarPrice);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getDolarPrice() {
        return _getDolarPrice.apply(this, arguments);
      }

      return getDolarPrice;
    }()
  }]);

  return Scraping;
}();

var _default = new Scraping();

exports["default"] = _default;