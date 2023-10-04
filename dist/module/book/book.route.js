"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
router.post("/books/create-book", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.addBookController);
router.get("/books", book_controller_1.getAllBooksController);
router.get("/books/:id", book_controller_1.getSingleBookController);
router.get("/books/:category/category", book_controller_1.getBooksByCategoryIdController);
router.patch("/books/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.updateBookController);
router.delete("/books/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.deleteBookController);
exports.bookRoutes = router;
