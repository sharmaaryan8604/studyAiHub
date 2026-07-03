import api from "../api/axios";

// Generate Summary
export const generateSummary = async (noteId) => {

    const response = await api.post(
        `/ai/summary/${noteId}`
    );

    return response.data;
};