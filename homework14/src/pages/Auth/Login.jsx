import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            navigate('/');
        }
    }, [])
    
    const handleLogin = async(e) => {
        e.preventDefault();

        const formData = {
            email,
            password,
        };

        try {
            const response = await axios.post('https://watchit-api.onrender.com/auth/login', formData);
            console.log(response);
            if(response.data.access_token) {
                localStorage.setItem('accessToken', response.data.access_token);
                navigate('/');
            }
        } catch(e) {
            setError();
        }
    };
    
    return (
        <div className="container">
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10, borderRadius: '4px', padding: '60px 30px', backgroundColor: 'white'}}>
                <form onSubmit={handleLogin}>
                    <Typography  
                    style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: '20px',
                        marginBottom: '15px'
                    }}>
                        Login
                    </Typography>
                    <input 
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        className="login-input" 
                    />
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        className="login-input" 
                    />
                    {error && <Typography fontSize={'13px'}>Something went wrong</Typography>}
                    <input type="submit" value={'Login'} className="login-button" />
                </form>
            </Box>
        </div>
    );
};

export default Login;