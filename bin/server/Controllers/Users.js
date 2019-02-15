"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Users {
  static index(database, request, response) {
    console.log(`ℹ️  (${request.method.toUpperCase()}) ${request.url}`);
    database.collection("users").find({}).toArray((error, result) => {
      _assert.default.equal(null, error);

      response.send(JSON.stringify(result));
    });
  }

}

exports.default = Users;
//# sourceMappingURL=Users.js.map