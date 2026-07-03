import { useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

const routeTitles = {
    "/dashboard": "Dashboard",
    "/notes": "Notes",
    "/quiz": "Quiz Generator",
    "/settings": "Settings",
};

const Navbar = () => {
    const location = useLocation();
    const { user } = useAuth();
    const { isDarkTheme } = useTheme();

    const title =
        routeTitles[location.pathname] ?? "StudyAI Hub";

    return (
        <header
            className={`sticky top-0 z-20 flex h-20 items-center justify-between border-b px-6 transition-colors duration-300 sm:px-8 ${
                isDarkTheme
                    ? "border-slate-800 bg-slate-950/95"
                    : "border-slate-200 bg-white/95"
            }`}
        >
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-500">
                    Workspace
                </p>
                <h2 className="mt-1 text-2xl font-bold">
                    {title}
                </h2>
            </div>

            <div className="flex items-center gap-3">
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl font-bold text-white ${
                        isDarkTheme
                            ? "bg-sky-500"
                            : "bg-slate-900"
                    }`}
                >
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <div className="text-right">
                    <p className="font-semibold">
                        {user?.name ?? "Student"}
                    </p>
                    <p
                        className={`text-sm ${
                            isDarkTheme
                                ? "text-slate-400"
                                : "text-slate-500"
                        }`}
                    >
                        {user?.email}
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
