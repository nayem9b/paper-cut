import express from "express";
import {
  addBookController,
  deleteBookController,
  getAllBooksController,
  getSingleBookController,
  updateBookController,
  getBooksByCategoryIdController,
} from "./book.controller";

const router = express.Router();

router.post("/books/create-book", addBookController);
router.get("/books", getAllBooksController);
router.get("/books/:id", getSingleBookController);
router.get("/books/:category/category", getBooksByCategoryIdController);
router.patch("/books/:id", updateBookController);
router.delete("/books/:id", deleteBookController);
export const bookRoutes = router;
