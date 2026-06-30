import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
    return (
        <AuthLayout
            title="Create Account 🚀"
            subtitle="Start learning smarter with AI"
        >
            <form className="space-y-5">

                <Input
                    label="Name"
                    placeholder="Enter your name"
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Create password"
                />

                <Button>
                    Register
                </Button>

            </form>

            <p className="text-center text-sm mt-6 text-slate-600">
                Already have an account?{" "}
                <Link
                    to="/"
                    className="text-blue-600 font-semibold"
                >
                    Login
                </Link>
            </p>

        </AuthLayout>
    );
};

export default Register;