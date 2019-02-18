"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  APP_PORT
} = process.env;
const app = (0, _express.default)();

const usersRouter = require("./routes/users.js");

const booksRouter = require("./routes/books.js");

const reviewsRouter = require("./routes/reviews.js");

const borrowedsRouter = require("./routes/borroweds.js");

const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

_mongoose.default.connect(url, {
  useNewUrlParser: true,
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  authSource: "admin"
});

const db = _mongoose.default.connection;
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_express.default.urlencoded());
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/borroweds", borrowedsRouter);
app.use(_express.default.static(_path.default.resolve(__dirname, "../../bin/client")));
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Successfully connected to server");
  app.get("/hello", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
    res.send("Hello, World!");
  });
  app.post("/login", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

    if (!req.body.email || !req.body.password) {
      console.error("Please fill all field");
      res.send("Please fill all fields");
      return;
    }

    Users.findOne({
      email: req.body.email
    }).then(user => {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        console.error("Email or password invalid");
        res.send("Email or password invalid");
        return;
      }

      let token = createToken({
        _id: user._id,
        pseudo: user.pseudo
      });
      localstorage.setItem("bookshelf_token", token);
      console.log("Successfully logged in");
      res.json(token);
      return;
    }).catch(error => {
      console.error(error);
      res.send(error);
      return;
    });
  });
  app.get("/logout", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);
    localstorage.removeItem("bookshelf_token");
    console.log("Successfully logged out");
    res.json("Successfully logged out");
    return;
  });
  app.listen(APP_PORT, () => console.log(`🚀 Server is listening on port ${APP_PORT}.`));
});
//# sourceMappingURL=index.js.map