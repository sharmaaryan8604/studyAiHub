import Note from "../models/note.model.js";

export const createNoteService = async (noteData) => {
    const note = await Note.create(noteData);
    return note;
};


export const getNoteByIdService = async (noteId, userId) => {
    const note = await Note.findOne({
        _id: noteId,
        user: userId,
    });

    return note;
};
export const getAllNotesService = async (userId) => {
    const notes = await Note.find({
        user: userId,
    }).sort({
        createdAt: -1,
    });

    return notes;
};

export const updateNoteService = async (
    noteId,
    userId,
    updateData
) => {
    const note = await Note.findOneAndUpdate(
        {
            _id: noteId,
            user: userId,
        },
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );

    return note;
};

export const deleteNoteService = async (noteId, userId) => {
    const note = await Note.findOneAndDelete({
        _id: noteId,
        user: userId,
    });

    return note;
};