import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.m.js";
import { uploadPDF } from "../controllers/upload.controller.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    upload.single("pdf"),
    uploadPDF
);

export default router;