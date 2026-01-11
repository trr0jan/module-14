import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            navigate("/home", { replace: true });
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        if (!cleanEmail || !cleanPassword) {
            setError("Email and password are required");
            return;
        }

        try {
            setError("");

            const response = await axios.post(
                "https://watchit-api.onrender.com/auth/login",
                {
                    email: cleanEmail,
                    password: cleanPassword,
                }
            );

            if (response.data?.access_token) {
                localStorage.setItem(
                    "accessToken",
                    response.data.access_token
                );
                navigate("/home", { replace: true });
            } else {
                setError("Invalid login response");
            }
        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);

            setError(
                err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Invalid email or password"
            );
        }
    };

    return (
        <div className="container">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 5,
                    borderRadius: "4px",
                    padding: "50px 30px",
                    backgroundColor: "white",
                }}
            >
                <form
                    onSubmit={handleLogin}
                    autoComplete="off"
                    noValidate
                >
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: "24px",
                            mb: "17px",
                        }}
                    >
                        Login
                    </Typography>

                    <input
                        type="email"
                        placeholder="Email"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        autoComplete="new-password"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        required
                    />

                    {error && (
                        <Typography fontSize="13px" color="red">
                            {error}
                        </Typography>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>

                    <Typography className="typo-dont-have">
                        Don't have an account?{" "}
                        <Link
                            to="/auth/registration"
                            className="register-button1"
                        >
                            Register now.
                        </Link>
                    </Typography>
                </form>
            </Box>
        </div>
    );
};

export default Login;