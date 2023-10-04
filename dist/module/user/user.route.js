"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
router.post("/auth/signup", user_controller_1.signUpUserController);
router.post("/auth/signin", user_controller_1.loginUser);
router.get("/users", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.getAllUsersController);
router.get("/users/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.getSingleUserController);
router.get("/profile", user_controller_1.getProfileInfoController);
router.patch("/users/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.updateSingleUserController);
router.delete("/users/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.deleteSingleUserController);
exports.userRoutes = router;
