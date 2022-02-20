"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controller = _interopRequireDefault(require("../../utils/controller"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PlatformController = {
  list: function () {
    var _list = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _controller["default"].tryCatch(res, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var query, params, result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        query = req.query;
                        params = {};

                        if (Object.keys(query).length > 0) {
                          if (query !== null && query !== void 0 && query.name) params.name = {
                            $regex: ".*".concat(query.name, ".*"),
                            $options: 'i'
                          };
                          if (query !== null && query !== void 0 && query.keyname) params.keyname = {
                            $regex: ".*".concat(query.keyname, ".*"),
                            $options: 'i'
                          };
                        }

                        _context.next = 5;
                        return _models.Platform.find(params);

                      case 5:
                        result = _context.sent;
                        res.json(_controller["default"].success(result));

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function list(_x, _x2) {
      return _list.apply(this, arguments);
    }

    return list;
  }(),
  create: function () {
    var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _controller["default"].tryCatch(res, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var create;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _models.Platform.create(req.body);

                      case 2:
                        create = _context3.sent;

                        if (create) {
                          res.json({
                            success: true,
                            data: create,
                            message: 'createSuccess'
                          });
                        } else {
                          res.status(400).json({
                            success: false,
                            data: {},
                            message: 'createFailed'
                          });
                        }

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              })));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function create(_x3, _x4) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _controller["default"].tryCatch(res, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var update;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return _models.Platform.findByIdAndUpdate(req.params._id, req.body, {
                          "new": true
                        });

                      case 2:
                        update = _context5.sent;

                        if (update) {
                          res.json({
                            success: true,
                            data: update,
                            message: 'updateSuccess'
                          });
                        } else {
                          res.status(400).json({
                            success: false,
                            data: {},
                            message: 'updateFailed'
                          });
                        }

                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              })));

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function update(_x5, _x6) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  changeStatus: function () {
    var _changeStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _controller["default"].tryCatch(res, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var getRecord;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return _models.Platform.findById(req.params._id);

                      case 2:
                        getRecord = _context7.sent;
                        getRecord.status = getRecord.status === '1' ? '0' : '1';
                        getRecord.save();

                        if (getRecord) {
                          res.json({
                            success: true,
                            data: {},
                            message: 'changeStatusSuccess'
                          });
                        } else {
                          res.status(400).json({
                            success: false,
                            data: {},
                            message: 'changeStatusFailed'
                          });
                        }

                      case 6:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              })));

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function changeStatus(_x7, _x8) {
      return _changeStatus.apply(this, arguments);
    }

    return changeStatus;
  }()
};
var _default = PlatformController;
exports["default"] = _default;