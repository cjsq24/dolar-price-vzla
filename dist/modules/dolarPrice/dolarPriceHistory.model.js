"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var venezuelaDate = _momentTimezone["default"].tz(Date.now(), 'America/Caracas');

var modelSchema = new _mongoose.Schema({
  platforms: [{
    platform_id: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Platform',
      required: true
    },
    price: {
      type: String,
      required: true
    }
  }],
  created_at: {
    type: Date,
    "default": venezuelaDate
  }
});

var _default = (0, _mongoose.model)('DolarPriceHistory', modelSchema);

exports["default"] = _default;