import {createNoteService,getAllNotesService,getNoteByIdService,updateNoteService,deleteNoteService,} from "../services/note.service.js";


export const createNote=async(req,res)=>{
    try {
        const { title, content, category, tags } = req.body;

        if(!title||!content){
            res.status(400).json({
                success: false,
                message: "Title and content are required",
            });

        }
        const note = await createNoteService({
            title,
            content,
            category,
            tags,
            user: req.user.id,
        });
        return res.status(201).json({
            success: true,
            message: "Note created successfully",
            note,
        });


        
    } catch (error)
     {
        console.error(error);
        return res.status(500).json({
            success:"false",
            message:"Internal Server Error",
        })
        
    }
}

export const getNoteById = async (req, res) => {
    try {

        const { id } = req.params;

        const note = await getNoteByIdService(
            id,
            req.user.id
        );

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        return res.status(200).json({
            success: true,
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
export const getAllNotes = async (req, res) => {
    try {

        const notes = await getAllNotesService(req.user.id);

        return res.status(200).json({
            success: true,
            count: notes.length,
            notes,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

export const updateNote = async (req, res) => {
    try {

        const note = await updateNoteService(
            req.params.id,
            req.user.id,
            req.body
        );

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Note updated successfully",
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


export const deleteNote = async (req, res) => {
    try {

        const note = await deleteNoteService(
            req.params.id,
            req.user.id
        );

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully",
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};