import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FiLoader,
    FiUploadCloud,
    FiX,
} from "react-icons/fi";

import { uploadPDF } from "../../services/upload.service";
import UploadDropzone from "./UploadDropzone";
import {
    formatFileSize,
    validatePdfFile,
} from "./upload.utils";

const UploadModal = ({
    isOpen,
    onClose,
    onSuccess,
}) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [validationError, setValidationError] =
        useState("");

    useEffect(() => {
        if (!isOpen) {
            setFile(null);
            setLoading(false);
            setProgress(0);
            setValidationError("");
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleValidationError = (message) => {
        setValidationError(message);

        if (message) {
            toast.error(message);
        }
    };

    const handleFileSelect = (selectedFile) => {
        const errorMessage = validatePdfFile(selectedFile);

        if (errorMessage) {
            handleValidationError(errorMessage);
            return;
        }

        setValidationError("");
        setFile(selectedFile);
        setProgress(0);
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    const handleUpload = async () => {
        const errorMessage = validatePdfFile(file);

        if (errorMessage) {
            handleValidationError(errorMessage);
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);

        const toastId = toast.loading(
            `Uploading ${file.name}...`
        );

        try {
            setLoading(true);
            setProgress(0);
            setValidationError("");

            const data = await uploadPDF(
                formData,
                (progressEvent) => {
                    if (!progressEvent.total) {
                        return;
                    }

                    const nextProgress = Math.min(
                        100,
                        Math.round(
                            (progressEvent.loaded * 100) /
                                progressEvent.total
                        )
                    );

                    setProgress(nextProgress);
                }
            );

            setProgress(100);
            toast.success(
                data?.message ?? "PDF uploaded successfully.",
                { id: toastId }
            );

            await onSuccess?.();
            onClose();
        } catch (error) {
            const message =
                error?.response?.data?.message ??
                "Upload failed. Please try again.";

            setProgress(0);
            setValidationError(message);
            toast.error(message, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.7)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" />

                <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:px-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-500">
                            Smart Upload
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">
                            Upload study material
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Turn a PDF into searchable notes in a
                            single step.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={loading}
                        className="rounded-full border border-slate-200 p-3 text-slate-500 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <FiX className="text-lg" />
                    </button>
                </div>

                <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
                    <UploadDropzone
                        disabled={loading}
                        errorMessage={validationError}
                        onFileSelect={handleFileSelect}
                        onValidationError={
                            handleValidationError
                        }
                        selectedFile={file}
                    />

                    {file ? (
                        <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                                        <FiUploadCloud className="text-xl" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                                            Selected File
                                        </p>
                                        <p className="mt-1 text-base font-semibold text-slate-900">
                                            {file.name}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {formatFileSize(
                                                file.size
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setFile(null);
                                        setProgress(0);
                                        setValidationError("");
                                    }}
                                    disabled={loading}
                                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Remove
                                </button>
                            </div>

                            {(loading || progress > 0) && (
                                <div className="mt-5 space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium text-slate-600">
                                            {progress === 100 &&
                                            loading
                                                ? "Finalizing note..."
                                                : "Upload progress"}
                                        </span>
                                        <span className="font-semibold text-slate-900">
                                            {progress}%
                                        </span>
                                    </div>

                                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-all duration-300"
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : null}

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleUpload}
                            disabled={!file || loading}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            {loading ? (
                                <FiLoader className="animate-spin text-base" />
                            ) : (
                                <FiUploadCloud className="text-base" />
                            )}
                            {loading
                                ? "Uploading..."
                                : "Upload PDF"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
