import express from "express";
import {
  addBookController,
  getAllBooksController,
  getSingleBookController,
} from "./book.controller";

const router = express.Router();

router.post("/books/create-book", addBookController);
router.get("/books", getAllBooksController);
router.get("/books/:id", getSingleBookController);
export const bookRoutes = router;
