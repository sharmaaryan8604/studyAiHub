import { uploadPDFService } from "../services/upload.service.js";

export const uploadPDF = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No PDF uploaded",
            });
        }

        const note = await uploadPDFService(
            req.file,
            req.user.id
        );

        return res.status(201).json({
            success: true,
            message: "PDF uploaded successfully",
            note,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};