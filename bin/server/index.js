"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _Users = _interopRequireDefault(require("./Controllers/Users.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  APP_PORT
} = process.env;
const app = (0, _express.default)();

const MongoClient = require("mongodb").MongoClient;

let db = null;

(async function () {
  const dbName = process.env.DB_NAME;
  const url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}`;
  const client = new MongoClient(url, {
    useNewUrlParser: true
  });

  try {
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db(dbName);
  } catch (error) {
    console.error(error);
  }

  return;
})();

app.use(_express.default.static(_path.default.resolve(__dirname, "../../bin/client")));
app.get("/hello", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
  res.send("Hello, World!");
});
app.get("/users", (req, res) => {
  _Users.default.index(db, req, res);
});
app.listen(APP_PORT, () => console.log(`🚀 Server is listening on port ${APP_PORT}.`));
//# sourceMappingURL=index.js.map