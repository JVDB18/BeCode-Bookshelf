"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const wishlistSchema = new _mongoose.default.Schema({
  user_id: _mongoose.default.Schema.Types.ObjectId,
  book_id: _mongoose.default.Schema.Types.ObjectId
});

const Wishlists = _mongoose.default.model("Wishlists", wishlistSchema, "wishlists");

var _default = Wishlists;
exports.default = _default;
//# sourceMappingURL=Wishlists.js.map