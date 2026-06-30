import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await login(
            formData.email,
            formData.password
        );

        if (success) {
            navigate("/dashboard");
        }
    };

    return (
        <AuthLayout
            title="Welcome Back 👋"
            subtitle="Login to continue your study journey"
        >
            <form onSubmit={handleSubmit} className="space-y-5">

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>

            </form>

            <p className="text-center mt-6 text-sm text-slate-600">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
};

export default Login;