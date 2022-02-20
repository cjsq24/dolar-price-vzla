"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//Aquí agregaremos lógica para que los demás controladores extiendan esta clase
var Controller = /*#__PURE__*/function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, [{
    key: "tryCatch",
    value: function () {
      var _tryCatch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res, callBack) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return callBack();

              case 3:
                _context.next = 10;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](0);
                console.log('Server error', _context.t0);
                res.status(400).json(this.error('serverError'));
                return _context.abrupt("return");

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5]]);
      }));

      function tryCatch(_x, _x2) {
        return _tryCatch.apply(this, arguments);
      }

      return tryCatch;
    }()
  }, {
    key: "success",
    value: function success(data) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return {
        success: true,
        data: data,
        message: message
      };
    }
  }, {
    key: "error",
    value: function error() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return {
        success: false,
        message: message
      };
    }
  }]);

  return Controller;
}();

var _default = new Controller();

exports["default"] = _default;