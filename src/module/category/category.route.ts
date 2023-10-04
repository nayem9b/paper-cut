import express from "express";
import {
  addCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "./category.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";

const router = express.Router();

router.get("/categories", getAllCategoryController);
router.get("/categories/:id", getSingleCategoryController);
router.post("/categories", auth(ENUM_USER_ROLE.ADMIN), addCategoryController);
router.patch(
  "/categories/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  updateCategoryController
);
router.delete(
  "/categories/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  deleteCategoryController
);

export const categoryRoutes = router;
