import asyncHandler from "../utils/asyncHandler.js";
import { loginUser } from "../services/auth.services.js";

export const login = asyncHandler(async (req, res) => {

    const result = await loginUser(req.body);

    res.status(200).json(result);

});