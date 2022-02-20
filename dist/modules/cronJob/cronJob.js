"use strict";

var _nodeCron = _interopRequireDefault(require("node-cron"));

var _dolarPrice = require("../dolarPrice/dolarPrice.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_nodeCron["default"].schedule('10 9,13 * * *', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var result;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Dolar Price 9-1');
          _context.next = 3;
          return (0, _dolarPrice.scrapingPriceAndInsert)('today');

        case 3:
          result = _context.sent;
          console.log(result);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})), {
  scheduled: true,
  timezone: 'America/Caracas'
});

_nodeCron["default"].schedule('0,5,10,15,20,25,30,35,40,45,50,55 * * * *', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var result;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('Dolar Price every 30 minutes');
          _context2.next = 3;
          return (0, _dolarPrice.scrapingPriceAndInsert)('history');

        case 3:
          result = _context2.sent;
          console.log(result);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})), {
  scheduled: true,
  timezone: 'America/Caracas'
});