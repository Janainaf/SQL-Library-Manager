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

/* GET articles listing. */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
    res.render("index", { books, title: "Book list" });
    console.log(books);
  })
);

/* GET articles listing. */
// router.get(
//   "/books",
//   asyncHandler(async (req, res) => {
//     const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
//     res.render("index", { books, title: "Book list" });
//     console.log(books);
//   })
// );

/* GET articles listing. */
// router.get(
//   "/books/new",
//   asyncHandler(async (req, res) => {
//     const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
//     res.render("index", { books, title: "Book list" });
//     console.log(books);
//   })
// );

/* GET articles listing. */
// router.get(
//   "/books/:id",
//   asyncHandler(async (req, res) => {
//     const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
//     res.render("index", { books, title: "Book list" });
//     console.log(books);
//   })
// );

/* GET articles listing. */
// router.post(
//   "/books/:id",
//   asyncHandler(async (req, res) => {
//     const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
//     res.render("index", { books, title: "Book list" });
//     console.log(books);
//   })
// );

/* GET articles listing. */
// router.post(
//   "/books/:id/delete",
//   asyncHandler(async (req, res) => {
//     const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
//     res.render("index", { books, title: "Book list" });
//     console.log(books);
//   })
// );
module.exports = router;
