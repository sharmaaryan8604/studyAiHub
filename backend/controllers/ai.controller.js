import {
    generateQuizService,
    generateSummaryService,
} from "../services/ai.service.js";

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

export const generateQuiz = async (req, res) => {
    try {
        const quiz = await generateQuizService(
            req.params.noteId,
            req.user.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            quiz,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
