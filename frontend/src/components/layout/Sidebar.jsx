import { NavLink, useNavigate } from "react-router-dom";
import {
    FiBookOpen,
    FiHome,
    FiLogOut,
    FiMoon,
    FiSettings,
    FiSun,
    FiTarget,
} from "react-icons/fi";

import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

const Sidebar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { isDarkTheme, toggleTheme } = useTheme();

    const menu = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: FiHome,
        },
        {
            name: "Notes",
            path: "/notes",
            icon: FiBookOpen,
        },
        {
            name: "Quiz Generator",
            path: "/quiz",
            icon: FiTarget,
        },
        {
            name: "Settings",
            path: "/settings",
            icon: FiSettings,
        },
    ];

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <aside
            className={`flex min-h-screen w-72 flex-col border-r px-5 py-6 transition-colors duration-300 ${
                isDarkTheme
                    ? "border-slate-800 bg-slate-950 text-slate-100"
                    : "border-slate-200 bg-white text-slate-900"
            }`}
        >
            <div className="rounded-[28px] bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400 p-[1px] shadow-[0_20px_60px_-35px_rgba(56,189,248,0.7)]">
                <div
                    className={`rounded-[27px] px-5 py-5 ${
                        isDarkTheme
                            ? "bg-slate-950"
                            : "bg-white"
                    }`}
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-500">
                        StudyAI Hub
                    </p>
                    <h1 className="mt-3 text-2xl font-bold">
                        Focus mode for smarter study sessions.
                    </h1>
                </div>
            </div>

            <nav className="mt-8 space-y-2">
                {menu.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition ${
                                    isActive
                                        ? isDarkTheme
                                            ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                                            : "bg-slate-900 text-white"
                                        : isDarkTheme
                                          ? "text-slate-300 hover:bg-slate-900 hover:text-white"
                                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`
                            }
                        >
                            <Icon className="text-lg" />
                            {item.name}
                        </NavLink>
                    );
                })}
            </nav>

            <div className="mt-auto space-y-3 pt-8">
                <button
                    type="button"
                    onClick={toggleTheme}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                        isDarkTheme
                            ? "border-slate-800 bg-slate-900 text-slate-100 hover:border-slate-700"
                            : "border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300"
                    }`}
                >
                    <span className="flex items-center gap-3 font-medium">
                        {isDarkTheme ? (
                            <FiSun className="text-lg" />
                        ) : (
                            <FiMoon className="text-lg" />
                        )}
                        {isDarkTheme
                            ? "Light Theme"
                            : "Dark Theme"}
                    </span>
                    <span className="text-xs uppercase tracking-[0.24em] opacity-70">
                        Toggle
                    </span>
                </button>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl bg-rose-600 px-4 py-3 font-semibold text-white transition hover:bg-rose-700"
                >
                    <FiLogOut className="text-lg" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
