import "../config/env.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

if (!apiKey) {
    throw new Error("Gemini API key is missing. Set GEMINI_API_KEY or API_KEY in backend/.env");
}

const genAI = new GoogleGenerativeAI(apiKey.trim());

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

export default model;
