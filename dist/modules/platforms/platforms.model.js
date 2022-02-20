"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var modelSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  keyname: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: String,
    "default": '1',
    "enum": ['1', '0']
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Platform', modelSchema);

exports["default"] = _default;