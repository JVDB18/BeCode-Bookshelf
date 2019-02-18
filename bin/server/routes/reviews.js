"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _express = _interopRequireDefault(require("express"));

var _authentication = require("../authentication.js");

var _Reviews = _interopRequireDefault(require("../models/Reviews.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.default.Router();
router.all("*", _authentication.authMiddleware);
router.get("/", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/reviews${req.url}`);

  _Reviews.default.find().then(reviews => {
    res.json(reviews);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.get("/:review", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/reviews${req.url}`);

  _Reviews.default.findOne({
    _id: req.params.review
  }).then(review => {
    res.json(review);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.post("/", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/reviews${req.url}`);

  if (!req.body.user_id || !req.body.book_id || !req.body.stars || !req.body.commentary) {
    console.log("Missing informations to create review");
    res.send("Missing informations to create review");
    return;
  }

  const review = {
    user_id: new _mongoose.default.Types.ObjectId(req.body.user_id),
    book_id: new _mongoose.default.Types.ObjectId(req.body.book_id),
    stars: req.body.stars,
    commentary: req.body.commentary,
    created_at: Date.now(),
    updated_at: null
  };

  _Reviews.default.create(review).then(result => {
    console.log("Review saved to database.");
    res.json(result);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.put("/:review", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/reviews${req.url}`);

  if (!req.body.stars || !req.body.commentary) {
    console.log("Missing informations to update review");
    res.send("Missing informations to update review");
    return;
  }

  const review = {
    stars: req.body.stars,
    commentary: req.body.commentary,
    updated_at: Date.now()
  };
  const options = {
    new: true
  };

  _Reviews.default.findOneAndUpdate({
    _id: req.params.review
  }, review, options, (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    console.log("Review updated in database");
    res.json(result);
  });
});
router.delete("/:review", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/reviews${req.url}`);

  _Reviews.default.findOneAndDelete({
    _id: req.params.review
  }, (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    if (result === null) {
      console.error("Review not found");
      res.send("Review not found");
      return;
    }

    console.log("Review deleted from database");
    res.send("Review deleted from database");
  });
});
module.exports = router;
//# sourceMappingURL=reviews.js.map