"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookFromDBService = exports.updateBookFromDBService = exports.getSingleBookFromDBService = exports.getAllBooksofCategoryService = exports.getAllBooksFromDBService = exports.addBookToDBService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const book_constant_1 = require("./book.constant");
const paginationHelper_1 = require("../../helpers/paginationHelper");
const addBookToDBService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
exports.addBookToDBService = addBookToDBService;
const getAllBooksFromDBService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filtersData = __rest(filters, ["search"]);
    console.log(filtersData);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_constant_1.bookSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map((key) => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    console.log(JSON.stringify(andConditions));
    console.log(JSON.stringify(whereConditions));
    const result = yield prisma_1.default.book.findMany({
        where: whereConditions,
        include: {
            category: true,
        },
        take: limit,
        skip,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {},
    });
    const total = yield prisma_1.default.book.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
exports.getAllBooksFromDBService = getAllBooksFromDBService;
const getAllBooksofCategoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId: id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
exports.getAllBooksofCategoryService = getAllBooksofCategoryService;
const getSingleBookFromDBService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
exports.getSingleBookFromDBService = getSingleBookFromDBService;
const updateBookFromDBService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
        include: {
            category: true,
        },
    });
    return result;
});
exports.updateBookFromDBService = updateBookFromDBService;
const deleteBookFromDBService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.deleteBookFromDBService = deleteBookFromDBService;
