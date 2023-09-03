import express from "express";
import {signUpUserController, getAllUsersController, getSingleUserController, updateSingleUserController} from './user.controller';

const router = express.Router();

router.post("/auth/signup", signUpUserController);
router.get("/users", getAllUsersController);
router.get("/users/:id", getSingleUserController);
router.patch("/users/:id", updateSingleUserController);
export const userRoutes = router;
