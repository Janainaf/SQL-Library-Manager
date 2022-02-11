const express = require("express");
const router = express.Router();
const Book = require("../models").Book;

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

/* GET books listing. */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
    res.render("index", { books, title: "Book list" });
    console.log(books);
  })
);

/* Create a new booking form. */
router.get("/books/new", (req, res) => {
  res.render("new-book", { book: {}, title: "New Book" });
});

/* Post bookins listing. */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    let book;
    book = await Book.create(req.body);
    res.redirect("/");
  })
);

/* Updating a booking form. */
router.get(
  "/books/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("update-book", { book, title: "Edit Book" });
    } else {
      res.sendStatus(404);
    }
  })
);
module.exports = router;
