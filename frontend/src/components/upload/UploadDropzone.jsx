import { useDropzone } from "react-dropzone";
import {
    FiAlertCircle,
    FiCheckCircle,
    FiFileText,
    FiUploadCloud,
} from "react-icons/fi";

import {
    getUploadErrorMessage,
    MAX_FILE_SIZE_BYTES,
} from "./upload.utils";

const UploadDropzone = ({
    disabled = false,
    errorMessage = "",
    onFileSelect,
    onValidationError,
    selectedFile,
}) => {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
    } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
        },
        disabled,
        maxFiles: 1,
        maxSize: MAX_FILE_SIZE_BYTES,
        multiple: false,
        onDropAccepted: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                onFileSelect(acceptedFiles[0]);
            }
        },
        onDropRejected: (fileRejections) => {
            const errorCode =
                fileRejections[0]?.errors?.[0]?.code;

            onValidationError?.(
                getUploadErrorMessage(errorCode)
            );
        },
    });

    const hasSelection = Boolean(selectedFile);
    const stateClasses = isDragReject
        ? "border-rose-300 bg-rose-50/90 shadow-rose-100"
        : isDragActive
          ? "scale-[1.01] border-sky-400 bg-sky-50 shadow-sky-100"
          : hasSelection
            ? "border-emerald-300 bg-emerald-50/80 shadow-emerald-100"
            : "border-slate-300 bg-white hover:border-sky-300 hover:bg-slate-50";

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`group relative overflow-hidden rounded-3xl border-2 border-dashed p-8 text-center transition-all duration-300 ${stateClasses} ${
                    disabled
                        ? "cursor-not-allowed opacity-70"
                        : "cursor-pointer shadow-lg"
                }`}
            >
                <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-80" />

                <input {...getInputProps()} />

                <div
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl transition duration-300 ${
                        isDragReject
                            ? "bg-rose-100 text-rose-500"
                            : hasSelection
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-slate-900 text-white group-hover:-translate-y-1"
                    } ${isDragActive ? "scale-110" : ""}`}
                >
                    {hasSelection ? (
                        <FiCheckCircle className="text-4xl" />
                    ) : (
                        <FiUploadCloud className="text-4xl" />
                    )}
                </div>

                <h2 className="mt-6 text-2xl font-bold text-slate-900">
                    {isDragActive
                        ? "Drop your PDF here"
                        : hasSelection
                          ? "Ready to upload"
                          : "Upload study material"}
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                    {isDragReject
                        ? "This dropzone accepts one PDF file at a time."
                        : hasSelection
                          ? "Your file passed validation and is ready to send."
                          : "Drag and drop a PDF here, or browse from your device in one click."}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-sky-600">
                    <FiFileText className="text-base" />
                    Choose PDF
                </div>

                <p className="mt-4 text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    PDF only • Max 20 MB
                </p>
            </div>

            {errorMessage ? (
                <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <FiAlertCircle className="mt-0.5 shrink-0 text-base" />
                    <p>{errorMessage}</p>
                </div>
            ) : null}
        </div>
    );
};

export default UploadDropzone;
