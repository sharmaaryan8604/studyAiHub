const NoteCard = ({ note, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">

            <div className="flex justify-between items-start">

                <h2 className="text-xl font-bold">
                    {note.title}
                </h2>

                {note.isFavorite && (
                    <span className="text-yellow-500 text-xl">
                        ⭐
                    </span>
                )}

            </div>

            <p className="text-gray-600 mt-3 line-clamp-3">
                {note.content}
            </p>

            <div className="flex justify-between items-center mt-5">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {note.category}
                </span>

                <div className="space-x-3">

                    <button
                        onClick={() => onEdit(note)}
                        className="text-blue-600 font-semibold"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(note._id)}
                        className="text-red-600 font-semibold"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
};

export default NoteCard;