const express = require("express");
const router = express.Router();
const Book = require("../models").Book;

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

/* GET books listing. */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
    res.render("index", { books, title: "Book list" });
  })
);

router.get(
  "/books",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
    res.render("index", { books, title: "Book list" });
  })
);

/* Create a new booking form. */
router.get("/books/new", (req, res) => {
  res.render("new-book", { book: {}, title: "New Book" });
});

/* Create a new book */
router.post(
  "/books/new",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect("/books");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        res.render("new-book", {
          book,
          errors: error.errors,
          title: "New Book",
        });
      } else {
        throw error;
      }
    }
  })
);

/* Update form. */
router.get(
  "/books/:id",
  asyncHandler(async (req, res) => {
    try {
      const book = await Book.findByPk(req.params.id);
      if (book) {
        res.render("update-book", { book, title: "Update Book" });
      } else {
        throw error;
      }
    } catch {
      throw error;
    }
  })
);

/* Update a book. */
router.post(
  "/books/:id",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      if (book) {
        await book.update(req.body);
        res.redirect("/books");
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.findByPk(req.params.id);
        res.render("update-book", {
          book,
          errors: error.errors,
          title: "Update Book",
        });
      } else {
        throw error;
      }
    }
  })
);

/* Delete  form. */
router.get(
  "/books/:id/delete",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("delete", { book, title: "Delete Book" });
    } else {
      res.sendStatus(404);
    }
  })
);

/* Delete 1 book */
router.post(
  "/books/:id/delete",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.redirect("/books");
    } else {
      res.sendStatus(404);
    }
  })
);
module.exports = router;
