import asyncHandler from "../utils/asyncHandler.js";
import { registerUser } from "../services/auth.services.js";

export const register = asyncHandler(async (req, res) => {
    const result = await registerUser(req.body);

    return res.status(201).json(result);
});