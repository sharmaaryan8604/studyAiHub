import { generateSummaryService } from "../services/ai.service.js";

export const generateSummary = async (req, res) => {
    try {

        const summary = await generateSummaryService(
            req.params.noteId,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            summary,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};