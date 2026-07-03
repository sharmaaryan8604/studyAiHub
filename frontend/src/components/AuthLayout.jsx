import BrandLogo from "./BrandLogo";

const AuthLayout = ({
    title,
    subtitle,
    children,
}) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f5efe3] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">

            {/* Background Glow */}
            <div className="auth-glow absolute left-[8%] top-16 h-40 w-40 rounded-full bg-[#d4e8d9] blur-3xl" />
            <div className="auth-glow absolute bottom-12 right-[8%] h-52 w-52 rounded-full bg-[#f7c9a9] blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.5),_transparent_45%)]" />

            <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl overflow-hidden rounded-[36px] border border-slate-900/10 bg-[#fbf7ef] shadow-[0_35px_90px_-45px_rgba(66,46,32,0.45)] lg:grid-cols-[1.1fr_0.9fr]">

                {/* Left Side */}
                <section className="relative flex flex-col justify-between overflow-hidden px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">

                    <div className="auth-rise">
                        <BrandLogo />

                        <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[1.05] text-[#1f2937] sm:text-6xl">
                            A calmer desk for focused study.
                        </h1>

                        <p className="mt-6 max-w-lg text-base leading-8 text-slate-600">
                            Notes, quizzes, uploads, and revision tools in one place,
                            designed to feel more like a study companion than a dashboard.
                        </p>
                    </div>

                    {/* Top Cards */}
                    <div className="mt-10 grid gap-6 lg:grid-cols-2">

                        <div className="auth-rise-delay rounded-[28px] border border-slate-900/10 bg-amber-50/80 p-5 backdrop-blur">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                                Session Mood
                            </p>

                            <p className="mt-3 text-2xl font-bold">
                                Deep Work
                            </p>

                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                Clean surfaces, fewer distractions, and revision-first
                                flows.
                            </p>
                        </div>

                        <div className="auth-rise rounded-[28px] border border-slate-900/10 bg-[#5a7aa7] p-5 text-white [animation-delay:0.15s]">

                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
                                Built For
                            </p>

                            <p className="mt-3 text-2xl font-bold">
                                Real study sessions
                            </p>

                            <p className="mt-2 text-sm leading-7 text-slate-300">
                                Upload notes, generate quizzes, and keep everything
                                practical.
                            </p>

                        </div>

                    </div>

                    {/* Floating Cards */}
                    <div className="pointer-events-none relative mt-10 hidden min-h-[250px] lg:block">

                        <div className="auth-drift absolute left-0 top-6 w-64 rotate-[-6deg] rounded-[30px] border border-slate-900/10 bg-white px-6 py-5 shadow-[0_24px_60px_-35px_rgba(66,46,32,0.35)]">

                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                                Revision Card
                            </p>

                            <h3 className="mt-3 text-xl font-bold">
                                One note can become a quiz in seconds.
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                Pick a note, set difficulty, and practice right away.
                            </p>

                        </div>

                        <div className="auth-drift absolute left-44 top-24 w-60 rotate-[7deg] rounded-[30px] border border-slate-900/10 bg-[#62b067] px-6 py-5 shadow-[0_24px_60px_-35px_rgba(66,46,32,0.30)] [animation-delay:0.8s]">

                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4a6b55]">
                                Study Flow
                            </p>

                            <h3 className="mt-3 text-xl font-bold text-[#203229]">
                                Upload. Organize. Practice.
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-[#355242]">
                                Less app-hopping, more actual learning.
                            </p>

                        </div>

                    </div>

                </section>

                {/* Right Side */}
                <section className="flex items-center justify-center border-t border-slate-900/10 bg-amber-50/70 px-4 py-8 backdrop-blur sm:px-8 lg:border-l lg:border-t-0 lg:px-10">

                    <div className="auth-rise-delay w-full max-w-md rounded-[32px] border border-slate-900/10 bg-stone-100 px-6 py-7 shadow-[0_35px_80px_-35px_rgba(15,23,42,0.40)] transition-all duration-500 lg:translate-x-10 sm:px-8 sm:py-8">

                        <h2 className="mt-4 font-serif text-4xl leading-tight text-slate-900">
                            {title}
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-slate-500">
                            {subtitle}
                        </p>

                        <div className="mt-8">
                            {children}
                        </div>

                    </div>

                </section>

            </div>

        </div>
    );
};

export default AuthLayout;
