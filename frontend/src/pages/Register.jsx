import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import AuthLayout from "../components/AuthLayout";
import Button from "../components/button";
import Input from "../components/input";
import useAuth from "../hooks/useAuth";

const Register = () => {
    const navigate = useNavigate();
    const { register, loading } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
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

        const success = await register(
            formData.name,
            formData.email,
            formData.password
        );

        if (success) {
            navigate("/dashboard");
        }
    };

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Set up your study space and keep your notes, uploads, and quizzes in one place."
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <Input
                    label="Name"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                />

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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    disabled={loading}
                >
                    <span className="inline-flex items-center justify-center gap-2">
                        {loading
                            ? "Creating account..."
                            : "Create account"}
                        {!loading ? <FiArrowRight /> : null}
                    </span>
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                    to="/"
                    className="font-semibold text-[#a1662f] transition hover:text-slate-900"
                >
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
};

export default Register;
