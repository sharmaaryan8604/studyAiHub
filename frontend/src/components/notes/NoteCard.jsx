import {
    FiClock,
    FiEdit2,
    FiTag,
    FiTrash2,
} from "react-icons/fi";

const NoteCard = ({
    note,
    onEdit,
    onDelete,
}) => {
    const createdAt = note.createdAt
        ? new Date(note.createdAt).toLocaleDateString()
        : "Recently added";

    return (
        <article className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_-50px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_-45px_rgba(15,23,42,0.55)]">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-80" />

            <div className="flex items-start justify-between gap-4">
                <div>
                    <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                        {note.category || "General"}
                    </span>

                    <h2 className="mt-4 text-2xl font-bold text-slate-900">
                        {note.title}
                    </h2>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500">
                    <FiClock />
                    {createdAt}
                </div>
            </div>

            <p className="mt-4 line-clamp-6 text-sm leading-7 text-slate-600">
                {note.content}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
                {note.tags?.length ? (
                    note.tags.map((tag, index) => (
                        <span
                            key={`${tag}-${index}`}
                            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                        >
                            <FiTag className="text-[11px]" />
                            {tag}
                        </span>
                    ))
                ) : (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                        Untagged
                    </span>
                )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                    type="button"
                    onClick={() => onEdit(note)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-4 py-3 font-semibold text-white transition hover:bg-amber-600"
                >
                    <FiEdit2 className="text-sm" />
                    Edit
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(note._id)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 py-3 font-semibold text-white transition hover:bg-rose-700"
                >
                    <FiTrash2 className="text-sm" />
                    Delete
                </button>
            </div>
        </article>
    );
};

export default NoteCard;
