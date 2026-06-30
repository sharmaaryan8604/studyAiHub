import { loginUser } from "../services/auth.services.js";

export const login = async (req, res) => {
    try {
        const result = await loginUser(req.body);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};