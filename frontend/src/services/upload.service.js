import api from "../api/axios";

export const uploadPDF = async (
    formData,
    onUploadProgress
) => {
    const response = await api.post(
        "/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        }
    );

    return response.data;
};
