import express from "express"
import { createNote,getAllNotes,getNoteById,updateNote,deleteNote,} from "../controllers/note.controllers.js"
import authMiddleware from "../middleware/auth.middleware.js"

const router=express.Router();

router.post("/",authMiddleware,createNote);
router.get("/", authMiddleware, getAllNotes);
router.get("/:id",authMiddleware,getNoteById);
router.put("/:id",authMiddleware,updateNote);
router.delete("/:id",authMiddleware,deleteNote);

export default router;