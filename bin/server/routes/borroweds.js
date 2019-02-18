"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _express = _interopRequireDefault(require("express"));

var _authentication = require("../authentication.js");

var _Borroweds = _interopRequireDefault(require("../models/Borroweds.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.default.Router();
router.all("*", _authentication.authMiddleware);
router.get("/", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/borroweds${req.url}`);

  _Borroweds.default.find().then(borroweds => {
    res.json(borroweds);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.get("/:borrowed", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/borroweds${req.url}`);

  _Borroweds.default.findOne({
    _id: req.params.borrowed
  }).then(borrowed => {
    res.json(borrowed);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.post("/", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/borroweds${req.url}`);

  if (!req.body.user_id || !req.body.book_id) {
    console.log("Missing informations to borrow book");
    res.send("Missing informations to borrow book");
    return;
  }

  const borrowed = {
    user_id: new _mongoose.default.Types.ObjectId(req.body.user_id),
    book_id: new _mongoose.default.Types.ObjectId(req.body.book_id),
    borrowed_date: Date.now(),
    returned_date: null
  };

  _Borroweds.default.create(borrowed).then(result => {
    console.log("Book borrowing saved to database.");
    res.json(result);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.put("/:borrowed", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/borroweds${req.url}`);

  if (!req.body.user_id || !req.body.book_id || !req.body.borrowed_date) {
    console.log("Missing informations to update book borrowing");
    res.send("Missing informations to update book borrowing");
    return;
  }

  const borrowed = {
    user_id: new _mongoose.default.Types.ObjectId(req.body.user_id),
    book_id: new _mongoose.default.Types.ObjectId(req.body.book_id),
    borrowed_date: req.body.borrowed_date,
    returned_date: req.body.returned_date ? req.body.returned_date : null
  };
  const options = {
    new: true
  };
  Reviews.findOneAndUpdate({
    _id: req.params.borrowed
  }, borrowed, options, (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    console.log("Book borrowing updated in database");
    res.json(result);
  });
});
module.exports = router;
//# sourceMappingURL=borroweds.js.map