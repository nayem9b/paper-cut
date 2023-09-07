import express from "express";
import {
  signUpUserController,
  getAllUsersController,
  getSingleUserController,
  updateSingleUserController,
  deleteSingleUserController,
  loginUser,
} from "./user.controller";

const router = express.Router();

router.post("/auth/signup", signUpUserController);
router.post("/auth/signin", loginUser);
router.get("/users", getAllUsersController);
router.get("/users/:id", getSingleUserController);
router.patch("/users/:id", updateSingleUserController);
router.delete("/users/:id", deleteSingleUserController);
export const userRoutes = router;
