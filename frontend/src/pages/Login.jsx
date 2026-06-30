import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
    return (
        <AuthLayout
            title="Welcome Back 👋"
            subtitle="Login to continue your study journey"
        >
            <form className="space-y-5">

                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                />

                <Button>
                    Login
                </Button>

            </form>

            <p className="text-center text-sm mt-6 text-slate-600">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="text-blue-600 font-semibold"
                >
                    Register
                </Link>
            </p>

        </AuthLayout>
    );
};

export default Login;