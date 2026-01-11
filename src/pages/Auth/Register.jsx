import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (loading) return;

        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();
        const cleanConfirm = confirmPassword.trim();

        const newErrors = {};
        if (!cleanEmail) newErrors.email = "Email required";
        if (!cleanPassword) newErrors.password = "Password required";
        if (cleanPassword !== cleanConfirm)
            newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        if (Object.keys(newErrors).length) return;

        try {
            setLoading(true);

            // signup
            await axios.post(
                "https://watchit-api.onrender.com/auth/signup",
                {
                    email: cleanEmail,
                    password: cleanPassword,
                }
            );

            // login
            const loginResponse = await axios.post(
                "https://watchit-api.onrender.com/auth/login",
                {
                    email: cleanEmail,
                    password: cleanPassword,
                }
            );

            localStorage.setItem(
                "accessToken",
                loginResponse.data.access_token
            );

            navigate("/home", { replace: true });
        } catch (err) {
            console.error("AUTH ERROR:", err.response?.data);

            setErrors({
                api:
                    err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Authorization failed",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2,
                borderRadius: "4px",
                padding: "60px 30px",
                backgroundColor: "white",
                width: "270px",
            }}
        >
            <form
                onSubmit={handleRegister}
                autoComplete="off"
                noValidate
            >
                <Typography
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "20px",
                        mb: 2,
                    }}
                >
                    Registration
                </Typography>

                <input
                    className="register-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    required
                />

                <input
                    className="register-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    required
                />

                <input
                    className="register-input"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    required
                />

                {errors.confirmPassword && (
                    <Typography fontSize="12px" color="red">
                        {errors.confirmPassword}
                    </Typography>
                )}

                {errors.api && (
                    <Typography fontSize="13px" color="red">
                        {errors.api}
                    </Typography>
                )}

                <button
                    type="submit"
                    className="register-button"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </Box>
    );
};

export default Register;