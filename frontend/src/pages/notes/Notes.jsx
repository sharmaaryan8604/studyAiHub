import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import NoteCard from "../../components/notes/NoteCard";
import NoteModal from "../../components/notes/NoteModal";
import SummaryModal from "../../components/notes/SummaryModal";

import {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
} from "../../services/note.service";

import { generateSummary } from "../../services/ai.service";

const Notes = () => {
    // =========================
    // State
    // =========================
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    const [summaryModalOpen, setSummaryModalOpen] = useState(false);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [summaryText, setSummaryText] = useState("");
    const [summaryTitle, setSummaryTitle] = useState("");

    // =========================
    // Initial Load
    // =========================
    useEffect(() => {
        fetchNotes();
    }, []);

    // =========================
    // Fetch Notes
    // =========================
    const fetchNotes = async () => {
        try {
            setLoading(true);

            const data = await getAllNotes();

            setNotes(data.notes);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Create / Update Note
    // =========================
    const handleSaveNote = async (noteData) => {
        try {
            if (selectedNote) {
                await updateNote(selectedNote._id, noteData);
            } else {
                await createNote(noteData);
            }

            setIsModalOpen(false);
            setSelectedNote(null);

            fetchNotes();
        } catch (error) {
            console.error(error);
        }
    };

    // =========================
    // Delete Note
    // =========================
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmDelete) return;

        try {
            await deleteNote(id);

            setNotes((prev) =>
                prev.filter((note) => note._id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    // =========================
    // Edit Note
    // =========================
    const handleEdit = (note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    // =========================
    // AI Summary
    // =========================
    const handleSummary = async (note) => {
        try {
            setSummaryModalOpen(true);
            setSummaryLoading(true);

            setSummaryTitle(note.title);

            const data = await generateSummary(note._id);

            setSummaryText(data.summary);
        } catch (error) {
            console.error(error);
            alert("Failed to generate summary.");
        } finally {
            setSummaryLoading(false);
        }
    };

    // =========================
    // Search Filter
    // =========================
    const filteredNotes = notes.filter((note) => {
        const search = searchTerm.toLowerCase();

        return (
            note.title.toLowerCase().includes(search) ||
            note.content.toLowerCase().includes(search) ||
            note.category.toLowerCase().includes(search)
        );
    });

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

                <h1 className="text-4xl font-bold">
                    My Notes
                </h1>

                <input
                    type="text"
                    placeholder="🔍 Search notes..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    className="w-full md:w-96 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={() => {
                        setSelectedNote(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
                >
                    + New Note
                </button>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <h2 className="text-xl font-semibold">
                        Loading Notes...
                    </h2>
                </div>
            ) : filteredNotes.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-10 text-center">
                    <h2 className="text-2xl font-bold">
                        No Notes Found 📄
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Create your first study note.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotes.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onSummary={handleSummary}
                        />
                    ))}
                </div>
            )}

            {/* Create / Edit Note */}
            <NoteModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedNote(null);
                }}
                onSave={handleSaveNote}
                note={selectedNote}
            />

            {/* AI Summary */}
            <SummaryModal
                isOpen={summaryModalOpen}
                onClose={() => {
                    setSummaryModalOpen(false);
                    setSummaryText("");
                    setSummaryTitle("");
                }}
                loading={summaryLoading}
                summary={summaryText}
                title={summaryTitle}
            />
        </DashboardLayout>
    );
};

export default Notes;