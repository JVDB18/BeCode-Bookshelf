"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const reviewSchema = new _mongoose.default.Schema({
  user_id: _mongoose.default.Schema.Types.ObjectId,
  book_id: _mongoose.default.Schema.Types.ObjectId,
  stars: Number,
  commentary: String,
  created_at: Number,
  updated_at: Number
});

const Reviews = _mongoose.default.model("Reviews", reviewSchema, "reviews");

var _default = Reviews;
exports.default = _default;
//# sourceMappingURL=Reviews.js.map