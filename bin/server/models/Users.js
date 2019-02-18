"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  isCoach: Boolean,
  pseudo: String,
  email: String,
  password: String,
  created_at: Number,
  updated_at: Number
});

const Users = _mongoose.default.model("Users", userSchema, "users");

var _default = Users;
exports.default = _default;
//# sourceMappingURL=Users.js.map