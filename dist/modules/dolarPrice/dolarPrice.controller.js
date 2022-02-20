"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapingPriceAndInsert = exports["default"] = void 0;

var _controller = _interopRequireDefault(require("../../utils/controller"));

var _scraping = _interopRequireDefault(require("../scrapping/scraping"));

var _models = require("../models");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DolarPriceController = {
  getActualPrice: function getActualPrice(req, res) {
    _controller["default"].tryCatch(res, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var result, dolarPriceToday, previousPrice;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _models.DolarPriceToday.find().sort({
                _id: -1
              }).limit(2).populate('platforms.platform_id');

            case 2:
              result = _context.sent;

              if (result) {
                //Seteamos un arreglo nuevo con su interface
                //Extraemos la última actualización de precio
                //let dolarPriceToday: IDolarTodayFull = result.length === 2 && JSON.parse(JSON.stringify(result[0]));
                dolarPriceToday = JSON.parse(JSON.stringify(result[0]));

                if (dolarPriceToday && result[1]) {
                  //Almacenamos el precio anterior en un nuevo objeto, para calcular la fluctuación
                  previousPrice = {};
                  result[1].platforms.map(function (_ref2) {
                    var plat = _ref2.platform_id,
                        price = _ref2.price;

                    if (plat) {
                      previousPrice[plat._id.toString()] = price;
                    }
                  }); //Calculamos la fluctuación

                  dolarPriceToday.platforms.map(function (_ref3, i) {
                    var plat = _ref3.platform_id,
                        price = _ref3.price;
                    var oldPrice = parseFloat(previousPrice[plat._id]) || 0;
                    var newPrice = parseFloat(price);
                    var fluctuation_bs = newPrice - oldPrice;
                    var fluctuation_percent = (fluctuation_bs * 100 / newPrice).toFixed(2);
                    dolarPriceToday.platforms[i].fluctuation_bs = fluctuation_bs.toFixed(2);
                    dolarPriceToday.platforms[i].fluctuation_percent = fluctuation_percent;
                  });
                } else {
                  dolarPriceToday.platforms.forEach(function (element) {
                    element.fluctuation_bs = '0.00';
                    element.fluctuation_percent = '0.00';
                  });
                }

                res.json(_controller["default"].success(dolarPriceToday));
              } else {
                console.log("Error");
                res.status(400).json(_controller["default"].error('dolarPriceGetFailed'));
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  },
  create: function create(req, res) {},
  testingScraping: function () {
    var _testingScraping = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _controller["default"].tryCatch(res, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var result;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return scrapingPriceAndInsert('today');

                      case 2:
                        result = _context2.sent;

                        if (result) {
                          res.json(_controller["default"].success(result, 'dolarPriceTodayCreateSuccess'));
                        } else {
                          res.status(400).json('dolarPriceTodayCreateFailed');
                        }

                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              })));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function testingScraping(_x, _x2) {
      return _testingScraping.apply(this, arguments);
    }

    return testingScraping;
  }()
};

var scrapingPriceAndInsert = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(type) {
    var resultScraping, platforms, filteredScraping, dolarPrice, modelToSet, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _scraping["default"].getDolarPrice();

          case 3:
            resultScraping = _context4.sent;
            _context4.next = 6;
            return _models.Platform.find();

          case 6:
            platforms = _context4.sent;

            if (!(resultScraping.length > 0 && platforms)) {
              _context4.next = 18;
              break;
            }

            //Filtramos el scraping que hicimos dependiendo de las plataformas registradas
            filteredScraping = resultScraping.filter(function (ele) {
              return platforms.some(function (plat) {
                return plat.keyname === ele.keyname;
              });
            }); //Creamos nuestro nuevo arreglo donde almacenaremos el resultado del scraping filtrado con su detalle como _id

            dolarPrice = [];
            filteredScraping.map(function (ele) {
              platforms.some(function (plat) {
                if (plat.keyname === ele.keyname) {
                  dolarPrice.push({
                    platform_id: plat._id,
                    price: ele.price
                  });
                }
              });
            });

            if (!(dolarPrice.length > 0)) {
              _context4.next = 17;
              break;
            }

            modelToSet = type === 'today' ? _models.DolarPriceToday : _models.DolarPriceHistory;
            _context4.next = 15;
            return modelToSet.create({
              platforms: dolarPrice,
              created_at: _momentTimezone["default"].tz(Date.now(), 'America/Caracas')
            });

          case 15:
            result = _context4.sent;
            return _context4.abrupt("return", result ? true : false);

          case 17:
            return _context4.abrupt("return", false);

          case 18:
            _context4.next = 24;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", false);

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 20]]);
  }));

  return function scrapingPriceAndInsert(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

exports.scrapingPriceAndInsert = scrapingPriceAndInsert;
var _default = DolarPriceController;
exports["default"] = _default;