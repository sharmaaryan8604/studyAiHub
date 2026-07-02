import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { generateSummary } from "../controllers/ai.controller.js";

const router = express.Router();

router.post(
    "/summary/:noteId",
    authMiddleware,
    generateSummary
);

export default router;