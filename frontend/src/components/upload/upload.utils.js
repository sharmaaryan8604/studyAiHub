export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

export const formatFileSize = (sizeInBytes = 0) => {
    if (sizeInBytes >= 1024 * 1024) {
        return `${(sizeInBytes / 1024 / 1024).toFixed(2)} MB`;
    }

    return `${Math.max(1, Math.round(sizeInBytes / 1024))} KB`;
};

export const validatePdfFile = (file) => {
    if (!file) {
        return "Select a PDF to upload.";
    }

    const fileName = file.name?.toLowerCase() ?? "";
    const isPdf =
        file.type === "application/pdf" ||
        fileName.endsWith(".pdf");

    if (!isPdf) {
        return "Only PDF files are supported.";
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
        return "PDF must be 20 MB or smaller.";
    }

    return "";
};

export const getUploadErrorMessage = (code) => {
    switch (code) {
        case "file-invalid-type":
            return "Only PDF files are supported.";
        case "file-too-large":
            return "PDF must be 20 MB or smaller.";
        case "too-many-files":
            return "Upload one PDF at a time.";
        default:
            return "That file can't be uploaded. Please try another PDF.";
    }
};
