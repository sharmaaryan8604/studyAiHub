import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import AuthLayout from "../components/AuthLayout";
import Button from "../components/button";
import Input from "../components/input";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setFormData((current) => ({
            ...current,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

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
            title="Welcome back"
            subtitle="Log in to pick up exactly where your last study session left off."
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
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
                    <span className="inline-flex items-center justify-center gap-2">
                        {loading
                            ? "Logging in..."
                            : "Enter Personal Library"}
                        {!loading ? <FiArrowRight /> : null}
                    </span>
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <Link
                    to="/register"
                    className="font-semibold text-[#a1662f] transition hover:text-slate-900"
                >
                    Create one
                </Link>
            </p>
        </AuthLayout>
    );
};

export default Login;
