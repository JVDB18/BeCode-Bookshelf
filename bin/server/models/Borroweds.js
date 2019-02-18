"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const borrowedSchema = new _mongoose.default.Schema({
  user_id: _mongoose.default.Schema.Types.ObjectId,
  book_id: _mongoose.default.Schema.Types.ObjectId,
  borrowed_date: Number,
  returned_date: Number
});

const Borroweds = _mongoose.default.model("Borroweds", borrowedSchema, "borroweds");

var _default = Borroweds;
exports.default = _default;
//# sourceMappingURL=Borroweds.js.map