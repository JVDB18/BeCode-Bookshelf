"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _express = _interopRequireDefault(require("express"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _authentication = require("../authentication.js");

var _Users = _interopRequireDefault(require("../models/Users.js"));

var _Wishlists = _interopRequireDefault(require("../models/Wishlists.js"));

var _Borroweds = _interopRequireDefault(require("../models/Borroweds.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.default.Router();
router.get("*", _authentication.authMiddleware);
router.get("/", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

  _Users.default.find().then(users => {
    res.json(users);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.get("/:user", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

  _Users.default.findOne({
    _id: req.params.user
  }).then(user => {
    res.json(user);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.post("/", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

  if (!req.body.password || !req.body.pseudo || !req.body.isCoach || !req.body.email) {
    console.log("Missing informations to create user");
    res.send("Missing informations to create user");
    return;
  }

  const user = {
    isCoach: req.body.isCoach,
    pseudo: req.body.pseudo,
    password: _bcryptjs.default.hashSync(req.body.password, 10),
    email: req.body.email,
    created_at: Date.now(),
    updated_at: null
  };

  _Users.default.create(user).then(result => {
    console.log(`${result.pseudo} saved to database.`);
    res.json(result);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.put("/:user", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

  if (!req.body.pseudo || !req.body.isCoach || !req.body.email) {
    console.log("Missing informations to update user");
    res.send("Missing informations to update user");
    return;
  }

  let user = {
    isCoach: req.body.isCoach,
    pseudo: req.body.pseudo,
    email: req.body.email,
    updated_at: Date.now()
  };
  const options = {
    new: true
  };

  if (req.body.password && req.body.password !== "") {
    user.password = _bcryptjs.default.hashSync(req.body.password, 10);
  }

  _Users.default.findOneAndUpdate({
    _id: req.params.user
  }, user, options, (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
    }

    console.log(`${result.pseudo} updated in database`);
    res.json(result);
  });
});
router.delete("/:user", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

  _Users.default.findOneAndDelete({
    _id: req.params.user
  }, (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    if (result === null) {
      console.error("User not found");
      res.send("User not found");
      return;
    }

    console.log(`${result.pseudo} deleted from database`);
    res.send(`${result.pseudo} deleted from database`);
  });
});
router.get("/:user/borroweds", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

  _Borroweds.default.find({
    user_id: req.params.user
  }, (error, borrows) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    res.json(borrows);
  });
});
router.get("/:user/wishlists", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

  _Wishlists.default.find().then(wishes => {
    res.json(wishes);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.get("/:user/wishlists/:wish", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

  _Wishlists.default.findOne({
    _id: req.params.wish
  }).then(wish => {
    res.json(wish);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.post("/:user/wishlists", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

  if (!req.params.user || !req.body.book_id) {
    console.log("Missing informations to add book to user's wishlist");
    res.send("Missing informations to add book to user's wishlist");
    return;
  }

  const wish = {
    user_id: new _mongoose.default.Types.ObjectId(req.params.user),
    book_id: new _mongoose.default.Types.ObjectId(req.body.book_id)
  };

  _Wishlists.default.create(wish).then(result => {
    console.log("Wishlist saved to database.");
    res.json(result);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.delete("/:user/wishlists/:wish", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

  _Wishlists.default.findOneAndDelete({
    _id: req.params.wish
  }, (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    if (result === null) {
      console.error("Wishlist not found");
      res.send("Wishlist not found");
      return;
    }

    console.log("Wishlist deleted from database");
    res.send("Wishlist deleted from database");
  });
});
module.exports = router;
//# sourceMappingURL=users.js.map