"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.authMiddleware = exports.createToken = exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyToken = function (token) {
  return new Promise((resolve, reject) => {
    _jsonwebtoken.default.verify(token, process.env.AUTH_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        reject(err);
      }

      resolve(decodedToken);
    });
  });
};

exports.verifyToken = verifyToken;

const createToken = function (sessionData) {
  const options = {
    expiresIn: 3600,
    algorithm: "HS256"
  };

  let token = _jsonwebtoken.default.sign({
    data: sessionData
  }, process.env.AUTH_SECRET, options);

  return token;
};

exports.createToken = createToken;

const authMiddleware = function (request, response, next) {
  let token = req.body.token;
  verifyToken(token).then(decodedToken => {
    request.user = decodedToken.data;
    next();
  }).catch(error => {
    console.error(error);
    res.json(error);
  });
};

exports.authMiddleware = authMiddleware;
var _default = {
  verifyToken,
  createToken,
  authMiddleware
};
exports.default = _default;
//# sourceMappingURL=authentication.js.map