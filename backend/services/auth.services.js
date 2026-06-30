import User from "../models/user.model.js";
import {
    hashPassword,
    comparePassword,
} from "../utils/password.utils.js";
import generateToken from "../utils/token.utils.js";


// Register User

export const registerUser = async (userData) => {
    const { name, email, password } = userData;

    // Validate input
    if (!name || !email || !password) {
        throw new Error("All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    // Generate JWT
    const token = generateToken(user._id);

    // Return data
    return {
        success: true,
        message: "User registered successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};


// Login User
export const loginUser = async (loginData) => {
    const { email, password } = loginData;

    // Validate input
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Return data
    return {
        success: true,
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};


// Get Current User

export const getCurrentUser = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return {
        success: true,
        user,
    };
};