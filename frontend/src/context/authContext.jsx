import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ==========================
    // Login User
    // ==========================
    const login = async (email, password) => {
        try {
            setLoading(true);

            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const { token, user } = response.data;

            // Save JWT
            localStorage.setItem("token", token);

            // Save User
            setUser(user);

            toast.success("Welcome back.");

            return true;
        } catch (error) {
            console.error(error.response?.data || error.message);

            toast.error(
                error.response?.data?.message ||
                    "Login failed"
            );

            return false;
        } finally {
            setLoading(false);
        }
    };

    // ==========================
    // Register User
    // ==========================
    const register = async (name, email, password) => {
        try {
            setLoading(true);

            const response = await api.post("/auth/register", {
                name,
                email,
                password,
            });

            const { token, user } = response.data;

            localStorage.setItem("token", token);

            setUser(user);

            toast.success("Account created.");

            return true;
        } catch (error) {
            console.error(error.response?.data || error.message);

            toast.error(
                error.response?.data?.message ||
                    "Registration failed"
            );

            return false;
        } finally {
            setLoading(false);
        }
    };

    // ==========================
    // Logout
    // ==========================
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    // ==========================
    // Get Logged-in User
    // ==========================
    const getCurrentUser = async () => {
        try {
            const response = await api.get("/user/me");

            setUser(response.data.user);
        } catch (error) {
            console.error(error.response?.data || error.message);

            localStorage.removeItem("token");

            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // ==========================
    // Auto Login
    // ==========================
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            getCurrentUser();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                getCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
