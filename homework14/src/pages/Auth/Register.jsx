import { Typography, Box } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Register.css'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async(event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const formData = {
            email,
            password,
        };

        try {
            const response = await axios.post('https://watchit-api.onrender.com/auth/signup', formData);
            console.log(response);
            if(response.status === 200) {
                navigate('/auth/login')
            }
        } catch(error) {
            setError(true)
        }
    };
    
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10, borderRadius: '4px', padding: '60px 30px', backgroundColor: 'white'}}>
            <form onSubmit={handleRegister}>
                <Typography 
                    style={{fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: '20px',
                        marginBottom: '15px'
                    }}>
                    Registration
                </Typography>
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    className="register-input" 
                />
                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    className="register-input"
                />
                <input 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Confirm password" 
                    className="login-input" 
                />
                {error && <Typography fontSize={'13px'}>Something went wrong</Typography>}
                <input type="submit" value={'Register'} className="register-button" />
            </form>
        </Box>
    );
};

export default Register;