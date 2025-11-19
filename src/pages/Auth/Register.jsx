import { Typography, Box } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Register.css'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        const newErrors = {};

        // Валидация email
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (email.length < 5) {
            newErrors.email = 'Email too short';
        }

        // Валидация пароля
        if (!password) newErrors.password = 'Password is required';
        if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        // Отправка данных
        try {
            const response = await axios.post('https://watchit-api.onrender.com/auth/signup', { email, password });
            if (response.status === 200) {
                navigate('/auth/login');
            }
        } catch (error) {
            setErrors({ api: 'Something went wrong' });
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
            borderRadius: '4px',
            padding: '60px 30px',
            backgroundColor: 'white',
            width: '270px'
        }}>
            <form onSubmit={handleRegister}>
                <Typography 
                    sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '20px', mb: 2 }}
                >
                    Registration
                </Typography>

                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    className="register-input"
                />
                {errors.email && <Typography sx={{ fontSize: '12px', color: 'red', mb: 1 }}>{errors.email}</Typography>}

                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    className="register-input"
                />
                {errors.password && <Typography sx={{ fontSize: '12px', color: 'red', mb: 1 }}>{errors.password}</Typography>}

                <input 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    type="password" 
                    name="confirmPassword"
                    placeholder="Confirm password" 
                    className="register-input" 
                />
                {errors.confirmPassword && <Typography sx={{ fontSize: '12px', color: 'red', mb: 1 }}>{errors.confirmPassword}</Typography>}

                {errors.api && <Typography sx={{ fontSize: '13px', color: 'red', mb: 1 }}>{errors.api}</Typography>}

                <input type="submit" value="Register" className="register-button" />
            </form>
        </Box>
    );
};

export default Register;
