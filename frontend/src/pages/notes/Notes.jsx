import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FiBookOpen,
    FiFileText,
    FiLayers,
    FiPlus,
    FiSearch,
    FiTag,
    FiUploadCloud,
} from "react-icons/fi";

import DashboardLayout from "../../components/layout/DashboardLayout";
import NoteCard from "../../components/notes/NoteCard";
import NoteModal from "../../components/notes/NoteModal";
import UploadModal from "../../components/upload/UploadModal";

import {
    createNote,
    deleteNote,
    getAllNotes,
    updateNote,
} from "../../services/note.service";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [uploadOpen, setUploadOpen] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setLoading(true);

            const data = await getAllNotes();
            setNotes(data.notes ?? []);
        } catch (error) {
            console.error(error);
            toast.error("Couldn't load your notes.");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNote = async (noteData) => {
        try {
            if (selectedNote) {
                await updateNote(selectedNote._id, noteData);
                toast.success("Note updated.");
            } else {
                await createNote(noteData);
                toast.success("Note created.");
            }

            setIsModalOpen(false);
            setSelectedNote(null);
            fetchNotes();
        } catch (error) {
            console.error(error);
            toast.error("Couldn't save that note.");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete =
            window.confirm("Delete this note?");

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteNote(id);
            setNotes((prevNotes) =>
                prevNotes.filter((note) => note._id !== id)
            );
            toast.success("Note deleted.");
        } catch (error) {
            console.error(error);
            toast.error("Couldn't delete that note.");
        }
    };

    const handleEdit = (note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const filteredNotes = notes.filter((note) => {
        const search = searchTerm.toLowerCase();

        return (
            (note.title ?? "").toLowerCase().includes(search) ||
            (note.content ?? "")
                .toLowerCase()
                .includes(search) ||
            (note.category ?? "")
                .toLowerCase()
                .includes(search)
        );
    });

    const noteCount = notes.length;
    const pdfNoteCount = notes.filter(
        (note) =>
            (note.category ?? "").toLowerCase() ===
            "pdf notes"
    ).length;
    const categoryCount = new Set(
        notes
            .map((note) => note.category)
            .filter(Boolean)
    ).size;
    const taggedNoteCount = notes.filter(
        (note) => note.tags?.length
    ).length;

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <section className="relative overflow-hidden rounded-[32px] bg-slate-900 px-6 py-8 text-white shadow-[0_30px_90px_-40px_rgba(15,23,42,0.9)] sm:px-8">
                    <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald-400/15 blur-3xl" />

                    <div className="relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">
                                Notes Dashboard
                            </p>
                            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                                Upload, search, and study from one clean workspace.
                            </h1>
                            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                                Turn PDFs into notes, keep everything searchable,
                                and jump into AI summaries when you need a faster
                                review pass.
                            </p>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setUploadOpen(true)
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-sky-100"
                                >
                                    <FiUploadCloud className="text-base" />
                                    Upload Material
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedNote(null);
                                        setIsModalOpen(true);
                                    }}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
                                >
                                    <FiPlus className="text-base" />
                                    New Note
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 xl:min-w-[360px]">
                            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="flex items-center gap-3 text-sky-200">
                                    <FiBookOpen />
                                    <span className="text-sm">
                                        Total Notes
                                    </span>
                                </div>
                                <p className="mt-3 text-3xl font-bold">
                                    {noteCount}
                                </p>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="flex items-center gap-3 text-emerald-200">
                                    <FiFileText />
                                    <span className="text-sm">
                                        PDF Notes
                                    </span>
                                </div>
                                <p className="mt-3 text-3xl font-bold">
                                    {pdfNoteCount}
                                </p>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="flex items-center gap-3 text-amber-200">
                                    <FiLayers />
                                    <span className="text-sm">
                                        Categories
                                    </span>
                                </div>
                                <p className="mt-3 text-3xl font-bold">
                                    {categoryCount}
                                </p>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="flex items-center gap-3 text-cyan-200">
                                    <FiTag />
                                    <span className="text-sm">
                                        Tagged Notes
                                    </span>
                                </div>
                                <p className="mt-3 text-3xl font-bold">
                                    {taggedNoteCount}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Your library
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {filteredNotes.length} result
                                {filteredNotes.length === 1
                                    ? ""
                                    : "s"}{" "}
                                from {noteCount} total notes
                            </p>
                        </div>

                        <div className="relative w-full lg:max-w-md">
                            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search title, content, or category"
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(
                                        event.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                            />
                        </div>
                    </div>
                </section>

                {loading ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-72 animate-pulse rounded-[28px] border border-slate-200 bg-white"
                            />
                        ))}
                    </div>
                ) : filteredNotes.length === 0 ? (
                    <div className="rounded-[32px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-[0_20px_70px_-50px_rgba(15,23,42,0.4)]">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-100 text-sky-600">
                            <FiUploadCloud className="text-2xl" />
                        </div>
                        <h2 className="mt-5 text-2xl font-bold text-slate-900">
                            {searchTerm
                                ? "No notes match your search."
                                : "No notes available yet."}
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                            {searchTerm
                                ? "Try a different keyword or clear the search to browse everything."
                                : "Upload a PDF to create searchable study notes automatically."}
                        </p>

                        {!searchTerm ? (
                            <button
                                type="button"
                                onClick={() =>
                                    setUploadOpen(true)
                                }
                                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-sky-600"
                            >
                                <FiUploadCloud className="text-base" />
                                Upload Your First PDF
                            </button>
                        ) : null}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredNotes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>
                )}
            </div>

            <UploadModal
                isOpen={uploadOpen}
                onClose={() => setUploadOpen(false)}
                onSuccess={fetchNotes}
            />

            <NoteModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedNote(null);
                }}
                onSave={handleSaveNote}
                note={selectedNote}
            />
        </DashboardLayout>
    );
};

export default Notes;
