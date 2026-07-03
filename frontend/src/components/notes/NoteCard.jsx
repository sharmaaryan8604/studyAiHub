const NoteCard = ({
    note,
    onEdit,
    onDelete,
    onSummary,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition">

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800">
                {note.title}
            </h2>

            {/* Category */}
            <p className="text-blue-600 mt-2 font-medium">
                {note.category}
            </p>

            {/* Content */}
            <p className="text-gray-600 mt-4 line-clamp-5">
                {note.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
                {note.tags?.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Date */}
            <p className="text-gray-400 text-sm mt-5">
                {new Date(note.createdAt).toLocaleDateString()}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">

                <button
                    onClick={() => onEdit(note)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
                >
                    ✏️ Edit
                </button>

                <button
                    onClick={() => onSummary(note)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
                >
                    🧠 AI Summary
                </button>

                <button
                    onClick={() => onDelete(note._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                >
                    🗑 Delete
                </button>

            </div>

        </div>
    );
};

export default NoteCard;