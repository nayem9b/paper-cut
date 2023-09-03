import express from "express";

const router = express.Router();

router.get("/categories");

export const categoryRoutes = router;
