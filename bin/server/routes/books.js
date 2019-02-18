"use strict";

var _express = _interopRequireDefault(require("express"));

var _authentication = require("../authentication.js");

var _Books = _interopRequireDefault(require("../models/Books.js"));

var _Borroweds = _interopRequireDefault(require("../models/Borroweds.js"));

var _Reviews = _interopRequireDefault(require("../models/Reviews.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.default.Router();
router.all("*", _authentication.authMiddleware);
router.get("/", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/books${req.url}`);

  _Books.default.find().then(books => {
    res.json(books);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.get("/:book", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/books${req.url}`);

  _Books.default.findOne({
    _id: req.params.book
  }).then(book => {
    res.json(book);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.post("/", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/books${req.url}`);

  if (!req.body.title || !req.body.author || !req.body.isbn) {
    console.log("Missing informations to create book");
    res.send("Missing informations to create book");
    return;
  }

  const book = {
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    language: req.body.language ? req.body.language : null,
    format: req.body.format ? req.body.format : null,
    created_at: Date.now(),
    updated_at: null
  };

  _Books.default.create(book).then(result => {
    console.log(`\"${result.title}\" saved to database.`);
    res.json(result);
  }).catch(error => {
    console.error(error);
    res.send(error);
  });
});
router.put("/:book", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/books${req.url}`);

  if (!req.body.title || !req.body.author || !req.body.isbn) {
    console.log("Missing informations to update book");
    res.send("Missing informations to update book");
    return;
  }

  const book = {
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    language: req.body.language ? req.body.language : null,
    format: req.body.format ? req.body.format : null,
    updated_at: Date.now()
  };
  const options = {
    new: true
  };

  _Books.default.findOneAndUpdate({
    _id: req.params.book
  }, book, options, (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    console.log(`\"${result.title}\" updated in database`);
    res.json(result);
  });
});
router.delete("/:book", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/books${req.url}`);

  _Books.default.findOneAndDelete({
    _id: req.params.book
  }, (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    if (result === null) {
      console.error("Book not found");
      res.send("Book not found");
      return;
    }

    console.log(`\"${result.title}\" deleted from database`);
    res.send(`\"${result.title}\" deleted from database`);
  });
});
router.get("/:book/borroweds", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/books${req.url}`);

  _Borroweds.default.find({
    book_id: req.params.book
  }, (error, borrows) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    res.json(borrows);
  });
});
router.get("/:book/reviews", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) /api/users${req.url}`);

  _Reviews.default.find({
    book_id: req.params.book
  }, (error, reviews) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    res.json(reviews);
  });
});
module.exports = router;
//# sourceMappingURL=books.js.map