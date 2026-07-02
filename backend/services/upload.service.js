import Note from "../models/note.model.js";
import { extractTextFromPDF } from "../utils/pdf.utils.js";

export const uploadPDFService = async (file, userId) => {

    // Extract text from PDF
    const extractedText = await extractTextFromPDF(file.path);

    // Create Note
    const note = await Note.create({
        title: file.originalname.replace(".pdf", ""),
        content: extractedText,
        category: "PDF Notes",
        tags: ["PDF"],
        user: userId,
    });

    return note;
};