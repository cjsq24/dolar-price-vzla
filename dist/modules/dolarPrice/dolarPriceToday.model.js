"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

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
    type: Date
  }
});

var _default = (0, _mongoose.model)('DolarPriceToday', modelSchema);

exports["default"] = _default;