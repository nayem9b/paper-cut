"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
router.get("/categories", category_controller_1.getAllCategoryController);
router.get("/categories/:id", category_controller_1.getSingleCategoryController);
router.post("/categories", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.addCategoryController);
router.patch("/categories/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.updateCategoryController);
router.delete("/categories/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.deleteCategoryController);
exports.categoryRoutes = router;
