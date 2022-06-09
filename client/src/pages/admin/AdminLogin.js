import { Box, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from '../../styles/Style.module.css';



export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();

        if(username === 'admin' && password === 'password') {
            navigate('/admin');
        }
        else {
            alert('Incorrect credentials. Please check and try again');
        }
    }


    return (
        <div>
            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh' gap='2rem'>
                <Typography component='h1' variant='h5' fontWeight={700}>Audiophile Admin Login</Typography>
                
                <form onSubmit={handleSubmit} style={{ width: '15rem' }}>
                    <Box display='flex' flexDirection='column' gap='0.5rem' marginBottom='1rem'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' name='username' onChange={(e) => setUsername(e.target.value)} />
                    </Box>

                    <Box display='flex' flexDirection='column' gap='0.5rem' marginBottom='1.5rem'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' onChange={(e) => setPassword(e.target.value)} />
                    </Box>

                    <Button type='submit' variant='contained' fullWidth>Login</Button>
                </form>
            </Box>
        </div>
    )
}