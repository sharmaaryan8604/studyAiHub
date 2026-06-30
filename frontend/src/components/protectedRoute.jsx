import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // Wait while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-xl font-semibold">Loading...</h2>
            </div>
        );
    }

    // User not logged in
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // User logged in
    return children;
};

export default ProtectedRoute;