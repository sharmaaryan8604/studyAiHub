import { useNavigate } from "react-router-dom";
import {
    FiArrowRight,
    FiBookOpen,
    FiSettings,
    FiTarget,
} from "react-icons/fi";

import DashboardLayout from "../components/layout/DashboardLayout";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isDarkTheme } = useTheme();

    const actions = [
        {
            title: "Notes",
            description:
                "Open your study library, upload material, and keep revisions searchable.",
            icon: FiBookOpen,
            onClick: () => navigate("/notes"),
            accent: "sky",
            layout: "wide",
        },
        {
            title: "Quiz Generator",
            description:
                "Draft practice questions from what you've already learned.",
            icon: FiTarget,
            onClick: () => navigate("/quiz"),
            accent: "amber",
        },
        {
            title: "Settings",
            description:
                "Tweak theme preferences and account behavior in one place.",
            icon: FiSettings,
            onClick: () => navigate("/settings"),
            accent: "emerald",
        },
    ];

    const accentStyles = {
        amber: isDarkTheme
            ? "bg-amber-500/15 text-amber-300"
            : "bg-amber-100 text-amber-700",
        emerald: isDarkTheme
            ? "bg-emerald-500/15 text-emerald-300"
            : "bg-emerald-100 text-emerald-700",
        sky: isDarkTheme
            ? "bg-sky-500/15 text-sky-300"
            : "bg-sky-100 text-sky-700",
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <section
                    className={`overflow-hidden rounded-[36px] border p-8 sm:p-10 ${
                        isDarkTheme
                            ? "border-slate-800 bg-slate-900"
                            : "border-slate-200 bg-[#f7f4ed]"
                    }`}
                >
                    <div className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
                        <div className="max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sky-500">
                                Personal Workspace
                            </p>
                            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                                Welcome back, {user?.name || "there"}.
                            </h1>
                            
                        </div>

                        <div
                            className={`rounded-[30px] border p-6 ${
                                isDarkTheme
                                    ? "border-slate-800 bg-slate-950"
                                    : "border-slate-200 bg-white"
                            }`}
                        >
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                                Today
                            </p>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`text-sm ${
                                            isDarkTheme
                                                ? "text-slate-400"
                                                : "text-slate-500"
                                        }`}
                                    >
                                        Focus
                                    </span>
                                    <span className="font-semibold">
                                        Review smarter
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`text-sm ${
                                            isDarkTheme
                                                ? "text-slate-400"
                                                : "text-slate-500"
                                        }`}
                                    >
                                        Active tools
                                    </span>
                                    <span className="font-semibold">
                                        2
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`text-sm ${
                                            isDarkTheme
                                                ? "text-slate-400"
                                                : "text-slate-500"
                                        }`}
                                    >
                                        Theme
                                    </span>
                                    <span className="font-semibold">
                                        {isDarkTheme
                                            ? "Dark"
                                            : "Light"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {actions.map((action) => {
                        const Icon = action.icon;

                        return (
                            <button
                                key={action.title}
                                type="button"
                                onClick={action.onClick}
                                className={`group rounded-[30px] border p-6 text-left transition duration-300 hover:-translate-y-1 ${
                                    action.layout === "wide"
                                        ? "lg:col-span-2 xl:col-span-1"
                                        : ""
                                } ${
                                    isDarkTheme
                                        ? "border-slate-800 bg-slate-900 hover:border-slate-700"
                                        : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                            >
                                <div
                                    className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${
                                        accentStyles[
                                            action.accent
                                        ]
                                    }`}
                                >
                                    <Icon className="text-2xl" />
                                </div>

                                <div className="mt-6 flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            {action.title}
                                        </h2>
                                        <p
                                            className={`mt-3 text-sm leading-7 ${
                                                isDarkTheme
                                                    ? "text-slate-400"
                                                    : "text-slate-600"
                                            }`}
                                        >
                                            {action.description}
                                        </p>
                                    </div>

                                    <FiArrowRight className="mt-1 text-xl transition group-hover:translate-x-1" />
                                </div>
                            </button>
                        );
                    })}
                </section>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
