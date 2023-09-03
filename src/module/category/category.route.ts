import express from "express";
import {
  addCategoryController,
  getAllCategoryController,
  updateCategoryController,
} from "./category.controller";

const router = express.Router();

router.get("/categories", getAllCategoryController);
router.post("/categories", addCategoryController);
router.patch("/categories/:id", updateCategoryController);

export const categoryRoutes = router;
