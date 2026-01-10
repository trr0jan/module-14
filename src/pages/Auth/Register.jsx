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

    const handleRegister = async (event) => {
        event.preventDefault();
        if (loading) return;

        const newErrors = {};

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();

        if (!trimmedEmail) {
            newErrors.email = "Email is required";
        } else if (trimmedEmail.length < 5) {
            newErrors.email = "Email is too short";
        }

        if (!trimmedPassword) {
            newErrors.password = "Password is required";
        }

        if (!trimmedConfirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (trimmedPassword !== trimmedConfirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {
            setLoading(true);

            const response = await axios.post(
                "https://watchit-api.onrender.com/auth/signup",
                {
                    email: trimmedEmail,
                    password: trimmedPassword,
                }
            );

            if (response.status === 200) {

                navigate("/home", { replace: true });
            }
        } catch (error) {
            setErrors({
                api:
                    error?.response?.data?.message ||
                    "Something went wrong. Please try again.",
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
            <form onSubmit={handleRegister} noValidate>
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
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="register-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="none"
                    required
                />
                {errors.email && (
                    <Typography sx={{ fontSize: "12px", color: "red", mb: 1 }}>
                        {errors.email}
                    </Typography>
                )}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="register-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="none"
                    required
                />
                {errors.password && (
                    <Typography sx={{ fontSize: "12px", color: "red", mb: 1 }}>
                        {errors.password}
                    </Typography>
                )}

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="register-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="none"
                    required
                />
                {errors.confirmPassword && (
                    <Typography sx={{ fontSize: "12px", color: "red", mb: 1 }}>
                        {errors.confirmPassword}
                    </Typography>
                )}

                {errors.api && (
                    <Typography sx={{ fontSize: "13px", color: "red", mb: 1 }}>
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