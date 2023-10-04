import express from "express";
import {
  addBookController,
  deleteBookController,
  getAllBooksController,
  getSingleBookController,
  updateBookController,
  getBooksByCategoryIdController,
} from "./book.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";

const router = express.Router();

router.post(
  "/books/create-book",
  auth(ENUM_USER_ROLE.ADMIN),
  addBookController
);
router.get("/books", getAllBooksController);
router.get("/books/:id", getSingleBookController);
router.get("/books/:category/category", getBooksByCategoryIdController);
router.patch("/books/:id", auth(ENUM_USER_ROLE.ADMIN), updateBookController);
router.delete("/books/:id", auth(ENUM_USER_ROLE.ADMIN), deleteBookController);
export const bookRoutes = router;
