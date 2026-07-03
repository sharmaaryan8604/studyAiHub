const SummaryModal = ({
    isOpen,
    onClose,
    loading,
    summary,
    title,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-8">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">
                        📄 AI Summary
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl font-bold hover:text-red-500"
                    >
                        ✕
                    </button>

                </div>

                <h3 className="text-lg font-semibold mb-4 text-blue-600">
                    {title}
                </h3>

                {loading ? (

                    <div className="flex flex-col items-center py-12">

                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                        <p className="mt-4 text-gray-500">
                            Gemini is generating summary...
                        </p>

                    </div>

                ) : (

                    <div className="max-h-[500px] overflow-y-auto">

                        <pre className="whitespace-pre-wrap text-gray-700 leading-8">
                            {summary}
                        </pre>

                    </div>

                )}

            </div>

        </div>
    );
};

export default SummaryModal;