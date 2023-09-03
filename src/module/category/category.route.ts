import express from "express";
import {
  addCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "./category.controller";

const router = express.Router();

router.get("/categories", getAllCategoryController);
router.get("/categories/:id", getSingleCategoryController);
router.post("/categories", addCategoryController);
router.patch("/categories/:id", updateCategoryController);
router.delete("/categories/:id", deleteCategoryController);

export const categoryRoutes = router;
