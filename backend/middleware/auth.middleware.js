import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.utils.js";
import asyncHandler from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {

    // 1. Get Authorization Header
    const authHeader = req.headers.authorization;

    // 2. Check if header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Access denied. No token provided.");
    }

    // 3. Extract Token
    const token = authHeader.split(" ")[1];

    // 4. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Find User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // 6. Attach User to Request
    req.user = user;

    // 7. Continue
    next();

});

export default authMiddleware;