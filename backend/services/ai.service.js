import Note from "../models/note.model.js";
import model from "../utils/gemini.js";

export const generateSummaryService = async (noteId, userId) => {

    const note = await Note.findOne({
        _id: noteId,
        user: userId,
    });

    if (!note) {
        throw new Error("Note not found");
    }

    // Don't call Gemini again if we already have a summary
    if (note.summary && note.summary.trim() !== "") {
        return note.summary;
    }

    const prompt = `
You are an expert study assistant.

Summarize the following study material.

Requirements:
- Use simple language.
- Use bullet points.
- Keep important definitions.
- Highlight key concepts.
- Maximum 300 words.

Study Material:

${note.content}
`;

    const result = await model.generateContent(prompt);

    const response = result.response;

    const summary = response.text();

    note.summary = summary;

    await note.save();

    return summary;
};