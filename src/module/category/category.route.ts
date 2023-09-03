import express from "express";
import { addCategoryController } from "./category.controller";

const router = express.Router();

router.get("/categories");
router.post("/categories", addCategoryController);

export const categoryRoutes = router;
