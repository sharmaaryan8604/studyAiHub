import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            default: "General",
        },

        tags: [
            {
                type: String,
            },
        ],

        isPinned: {
            type: Boolean,
            default: false,
        },

        isFavorite: {
            type: Boolean,
            default: false,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        summary: {
            type: String,
            default: "",
        },
        quiz: {
            type: String,
            default: "",
        },

        flashcards: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;