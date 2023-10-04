import express from "express";
import {
  signUpUserController,
  getAllUsersController,
  getSingleUserController,
  updateSingleUserController,
  deleteSingleUserController,
  loginUser,
  getProfileInfoController,
} from "./user.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";

const router = express.Router();

router.post("/auth/signup", signUpUserController);
router.post("/auth/signin", loginUser);
router.get("/users", auth(ENUM_USER_ROLE.ADMIN), getAllUsersController);
router.get("/users/:id", getSingleUserController);
router.get("/profile", getProfileInfoController);
router.patch(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  updateSingleUserController
);
router.delete(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  deleteSingleUserController
);
export const userRoutes = router;
