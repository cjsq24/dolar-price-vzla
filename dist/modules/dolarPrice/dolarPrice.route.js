"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _dolarPrice = _interopRequireDefault(require("./dolarPrice.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get('/get-actual-price', _dolarPrice["default"].getActualPrice);
router.post('/create', _dolarPrice["default"].create);
router.post('/test', _dolarPrice["default"].testingScraping);
var _default = router;
exports["default"] = _default;