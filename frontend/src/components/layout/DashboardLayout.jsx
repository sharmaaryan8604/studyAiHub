import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import useTheme from "../../hooks/useTheme";

const DashboardLayout = ({ children }) => {
    const { isDarkTheme } = useTheme();

    return (
        <div
            className={`flex min-h-screen transition-colors duration-300 ${
                isDarkTheme
                    ? "bg-slate-950 text-slate-100"
                    : "bg-slate-100 text-slate-900"
            }`}
        >
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <Navbar />

                <main className="flex-1 p-6 sm:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
