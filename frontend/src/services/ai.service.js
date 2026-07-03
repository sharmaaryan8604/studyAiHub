import api from "../api/axios";

// Generate Summary
export const generateSummary = async (noteId) => {

    const response = await api.post(
        `/ai/summary/${noteId}`
    );

    return response.data;
};

// Generate Quiz
export const generateQuiz = async (
    noteId,
    options = {}
) => {
    const response = await api.post(
        `/ai/quiz/${noteId}`,
        options
    );

    return response.data;
};
