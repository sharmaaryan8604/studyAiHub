import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const menu = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Notes", path: "/notes" },
        { name: "AI Summary", path: "/summary" },
        { name: "Quiz Generator", path: "/quiz" },
        { name: "Flashcards", path: "/flashcards" },
        { name: "Assignments", path: "/assignments" },
        { name: "Study Groups", path: "/groups" },
        { name: "Settings", path: "/settings" },
    ];

    return (
        <aside className="w-64 h-screen bg-slate-900 text-white p-6">

            <h1 className="text-2xl font-bold mb-10">
                StudyAI Hub
            </h1>

            <nav className="space-y-3">

                {menu.map((item) => (

                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg transition ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-slate-800"
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>

                ))}

            </nav>

        </aside>
    );
};

export default Sidebar;