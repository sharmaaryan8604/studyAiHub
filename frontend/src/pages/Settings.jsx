import { useNavigate } from "react-router-dom";
import {
    FiLogOut,
    FiMoon,
    FiSettings,
    FiSun,
} from "react-icons/fi";

import DashboardLayout from "../components/layout/DashboardLayout";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

const Settings = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const { isDarkTheme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <DashboardLayout>
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <section
                    className={`rounded-[34px] border p-8 ${
                        isDarkTheme
                            ? "border-slate-800 bg-slate-900"
                            : "border-slate-200 bg-white"
                    }`}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                        <FiSettings className="text-3xl" />
                    </div>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.34em] text-emerald-500">
                        Settings
                    </p>
                    <h1 className="mt-3 text-4xl font-bold">
                        Keep the workspace feeling like yours.
                    </h1>
                    <p
                        className={`mt-4 max-w-xl text-base leading-8 ${
                            isDarkTheme
                                ? "text-slate-300"
                                : "text-slate-600"
                        }`}
                    >
                        Theme and session controls live here as well
                        as in the sidebar, so you can manage the app
                        without hunting around.
                    </p>
                </section>

                <div className="space-y-6">
                    <section
                        className={`rounded-[30px] border p-6 ${
                            isDarkTheme
                                ? "border-slate-800 bg-slate-900"
                                : "border-slate-200 bg-white"
                        }`}
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                            Appearance
                        </p>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className={`mt-5 flex w-full items-center justify-between rounded-2xl border px-4 py-4 transition ${
                                isDarkTheme
                                    ? "border-slate-800 bg-slate-950 hover:border-slate-700"
                                    : "border-slate-200 bg-slate-50 hover:border-slate-300"
                            }`}
                        >
                            <span className="flex items-center gap-3 font-semibold">
                                {isDarkTheme ? (
                                    <FiSun className="text-lg text-amber-400" />
                                ) : (
                                    <FiMoon className="text-lg text-slate-700" />
                                )}
                                {isDarkTheme
                                    ? "Switch to light theme"
                                    : "Switch to dark theme"}
                            </span>
                            <span className="text-sm opacity-70">
                                {isDarkTheme
                                    ? "Dark"
                                    : "Light"}
                            </span>
                        </button>
                    </section>

                    <section
                        className={`rounded-[30px] border p-6 ${
                            isDarkTheme
                                ? "border-slate-800 bg-slate-900"
                                : "border-slate-200 bg-white"
                        }`}
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                            Session
                        </p>
                        <div className="mt-5 flex items-center justify-between">
                            <div>
                                <p className="font-semibold">
                                    {user?.name || "Student"}
                                </p>
                                <p
                                    className={`mt-1 text-sm ${
                                        isDarkTheme
                                            ? "text-slate-400"
                                            : "text-slate-500"
                                    }`}
                                >
                                    {user?.email}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-3 font-semibold text-white transition hover:bg-rose-700"
                            >
                                <FiLogOut />
                                Logout
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
