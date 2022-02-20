"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dolarPrice = _interopRequireDefault(require("./dolarPrice/dolarPrice.route"));

var _platforms = _interopRequireDefault(require("./platforms/platforms.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.use('/dolar-price', _dolarPrice["default"]);
router.use('/platforms', _platforms["default"]);
var _default = router;
exports["default"] = _default;