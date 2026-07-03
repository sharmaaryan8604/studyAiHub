const BrandLogo = ({
    className = "",
    textClassName = "",
    compact = false,
    stacked = false,
}) => {
    return (
        <div
            className={`flex ${
                stacked
                    ? "flex-col items-start gap-3"
                    : "items-center gap-3"
            } ${className}`}
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#f7efe1] shadow-[0_14px_30px_-20px_rgba(108,67,8,0.6)] ring-1 ring-[#d5c3a5]">
                <svg
                    aria-hidden="true"
                    className="h-12 w-12"
                    viewBox="0 0 96 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="#6B4507">
                        <path d="M28 60.5 13.5 65a5 5 0 0 0-3 7l.3.7a5 5 0 0 0 6.1 2.7L48 66l31.1 9.4a5 5 0 0 0 6.1-2.7l.3-.7a5 5 0 0 0-3-7L68 60.5 48 66 28 60.5Z" />
                        <path d="M25.5 26.5c0-3.6 2.9-6.5 6.5-6.5h3.7C39.1 11.6 46.8 7 55.4 7c12.5 0 22.7 9.5 24 21.7H83c3.6 0 6.5 2.9 6.5 6.5v17.3c0 3.6-2.9 6.5-6.5 6.5H68.7l-.8-.8a16.6 16.6 0 0 0-6.2-4l9.2-16.1-1.7-1-5.6 9.5a15.4 15.4 0 0 0-5.5-4.6V20.1h-2v20.7c-1.1-.3-2.2-.4-3.4-.4h-.6l-5.5-8.1-1.6 1.1 4.9 7.1a15.5 15.5 0 0 0-5.9 3.5V20h-2v26.3a15.2 15.2 0 0 0-4 7.8l-.6.1-.5.1h-7.9c-3.6 0-6.5-2.9-6.5-6.5V26.5Z" />
                        <path d="M31 63.2c3.8-4.1 10.8-6.7 17-6.7s13.2 2.6 17 6.7l-.6 7.7c-4.8-2-10.7-3.2-16.4-3.2S36.4 69 31.6 71l-.6-7.8Z" />
                        <path d="M42.2 48.5a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 0 0 0-17.4Zm11.7 8.7a8.7 8.7 0 1 0 17.4 0 8.7 8.7 0 0 0-17.4 0Z" />
                        <path d="M50.4 56.2h4.8v2h-4.8zM69.9 44.6l9.2 8.1-1.3 1.4-9.2-8.1zM65.8 48.3l8.1 9.1-1.5 1.3-8-9.1zM14.5 63l33.5 7.8L81.5 63l.6 2.7L48 74 13.9 65.7l.6-2.7Z" />
                    </g>
                    <g fill="#FCEBCC">
                        <circle cx="42.2" cy="57.2" r="6.7" />
                        <circle cx="62.6" cy="57.2" r="6.7" />
                    </g>
                </svg>
            </div>

            <div className={stacked ? "" : "min-w-0"}>
                <p
                    className={`font-black uppercase tracking-[0.2em] text-[#6B4507] ${
                        compact
                            ? "text-xs"
                            : "text-sm"
                    } ${textClassName}`}
                >
                    Study AI Hub
                </p>

                {!compact ? (
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.24em] text-[#9c7a47]">
                        Learn Smarter Daily
                    </p>
                ) : null}
            </div>
        </div>
    );
};

export default BrandLogo;
