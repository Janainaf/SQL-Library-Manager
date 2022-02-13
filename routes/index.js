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

router.get(
  "/books",
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

/* Create a new book */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    let book;
    book = await Book.create(req.body);
    res.redirect("/");
  })
);

/* Update form. */
router.get(
  "/books/:id",
  asyncHandler(async (req, res) => {
    let book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("update-book", { book, title: "Update Book" });
    } else {
      res.render("page-not-found", { title: "Page Not Found" });
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
        res.redirect("/");
      } else {
        res.sendStatus(404);
      }
    } catch (error) {}
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
      res.redirect("/");
    } else {
      res.sendStatus(404);
    }
  })
);
module.exports = router;
