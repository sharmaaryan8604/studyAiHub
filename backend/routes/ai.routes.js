import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
    generateQuiz,
    generateSummary,
} from "../controllers/ai.controller.js";

const router = express.Router();

router.post(
    "/summary/:noteId",
    authMiddleware,
    generateSummary
);

router.post(
    "/quiz/:noteId",
    authMiddleware,
    generateQuiz
);

export default router;
