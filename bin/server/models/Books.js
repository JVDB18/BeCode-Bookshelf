"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bookSchema = new _mongoose.default.Schema({
  title: String,
  author: String,
  isbn: String,
  language: String,
  format: String,
  created_at: Number,
  updated_at: Number
});

const Books = _mongoose.default.model("Books", bookSchema, "books");

var _default = Books;
exports.default = _default;
//# sourceMappingURL=Books.js.map