import { useState, useEffect } from "react";

const NoteModal = ({ isOpen, onClose, onSave, note })  => {
        const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        tags: "",
    });
    useEffect(() => {

        if (note) {
            setFormData({
                title: note.title || "",
                content: note.content || "",
                category: note.category || "",
                tags: note.tags?.join(", ") || "",
            });
        } else {
            setFormData({
                title: "",
                content: "",
                category: "",
                tags: "",
            });
        }

    }, [note]);
    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSave({
            ...formData,
            tags: formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag),
        });

        setFormData({
            title: "",
            content: "",
            category: "",
            tags: "",
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl p-8 w-full max-w-xl">

                <h2 className="text-2xl font-bold mb-6">
                    Create Note
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <input
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        name="tags"
                        placeholder="Tags (comma separated)"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <textarea
                        rows="6"
                        name="content"
                        placeholder="Write your notes..."
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <div className="flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >
                            {note ? "Update Note" : "Save Note"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default NoteModal;