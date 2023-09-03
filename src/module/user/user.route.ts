import express from "express";
import {
  signUpUserController,
  getAllUsersController,
  getSingleUserController,
  updateSingleUserController,
  deleteSingleUserController,
} from "./user.controller";

const router = express.Router();

router.post("/auth/signup", signUpUserController);
router.get("/users", getAllUsersController);
router.get("/users/:id", getSingleUserController);
router.patch("/users/:id", updateSingleUserController);
router.delete("/users/:id", deleteSingleUserController);
export const userRoutes = router;
