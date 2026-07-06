const SummaryModal = ({
    isOpen,
    onClose,
    loading,
    summary,
    title,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/55 p-3 sm:items-center sm:p-4">
            <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-[24px] border border-slate-200 bg-white p-4 shadow-2xl sm:rounded-[28px] sm:p-8">
                <div className="mb-4 flex items-start justify-between gap-4 sm:mb-6 sm:items-center">
                    <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        AI Summary
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-slate-400 transition hover:bg-slate-100 hover:text-rose-500"
                    >
                        x
                    </button>
                </div>

                <h3 className="mb-4 line-clamp-2 pr-2 text-base font-semibold text-sky-600 sm:text-lg">
                    {title}
                </h3>

                {loading ? (
                    <div className="flex flex-1 flex-col items-center justify-center py-10 sm:py-12">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />

                        <p className="mt-4 text-slate-500">
                            Generating summary...
                        </p>
                    </div>
                ) : (
                    <div className="min-h-0 overflow-y-auto rounded-2xl bg-slate-50 p-4 sm:p-5">
                        <pre className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700 sm:leading-8">
                            {summary}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SummaryModal;
