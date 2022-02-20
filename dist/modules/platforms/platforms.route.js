"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _platforms = _interopRequireDefault(require("./platforms.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get('/list', _platforms["default"].list);
router.post('/create', _platforms["default"].create);
router.put('/update/:_id', _platforms["default"].update);
router.put('/change-status/:_id', _platforms["default"].changeStatus);
var _default = router;
exports["default"] = _default;