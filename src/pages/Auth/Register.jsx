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

        const newErrors = {};
        if (!email) newErrors.email = "Email required";
        if (!password) newErrors.password = "Password required";
        if (password !== confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        if (Object.keys(newErrors).length) return;

        try {
            setLoading(true);

            await axios.post(
                "https://watchit-api.onrender.com/auth/signup",
                { email, password }
            );

            const loginResponse = await axios.post(
                "https://watchit-api.onrender.com/auth/login",
                { email, password }
            );

            localStorage.setItem(
                "accessToken",
                loginResponse.data.access_token
            );

            navigate("/home", { replace: true });
        } catch (err) {
            setErrors({
                api:
                    err?.response?.data?.message ||
                    "Registration failed",
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
                    className="register-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="none"
                    required
/>

                {errors.email && (
                    <Typography fontSize="12px" color="red">
                        {errors.email}
                    </Typography>
                )}

                <input
                    className="register-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    className="register-input"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
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