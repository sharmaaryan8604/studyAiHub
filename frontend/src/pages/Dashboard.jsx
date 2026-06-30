import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {

    const { user } = useAuth();

    return (
        <DashboardLayout>

            <div>

                <h1 className="text-4xl font-bold">
                    Welcome back, {user?.name} 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Ready to study smarter today?
                </p>

            </div>

            {/* Statistics */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

                <StatCard
                    title="Notes"
                    value="0"
                    color="text-blue-600"
                />

                <StatCard
                    title="Flashcards"
                    value="0"
                    color="text-green-600"
                />

                <StatCard
                    title="Quizzes"
                    value="0"
                    color="text-purple-600"
                />

                <StatCard
                    title="Assignments"
                    value="0"
                    color="text-red-600"
                />

            </div>

            {/* Quick Actions */}

            <h2 className="text-2xl font-bold mt-12 mb-6">
                Quick Actions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <QuickActionCard
                    title="📄 Upload Notes"
                    description="Upload PDF or DOCX"
                />

                <QuickActionCard
                    title="🤖 AI Summary"
                    description="Generate smart notes"
                />

                <QuickActionCard
                    title="📝 Quiz Generator"
                    description="Create MCQs instantly"
                />

                <QuickActionCard
                    title="🧠 Flashcards"
                    description="Study faster"
                />

            </div>

        </DashboardLayout>
    );
};

export default Dashboard;