import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/themeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <App />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3500,
                        style: {
                            borderRadius: "16px",
                            padding: "14px 16px",
                            background: "#0f172a",
                            color: "#f8fafc",
                            boxShadow:
                                "0 20px 60px -24px rgba(15, 23, 42, 0.7)",
                        },
                        success: {
                            iconTheme: {
                                primary: "#22c55e",
                                secondary: "#f8fafc",
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: "#ef4444",
                                secondary: "#f8fafc",
                            },
                        },
                    }}
                />
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>
);
