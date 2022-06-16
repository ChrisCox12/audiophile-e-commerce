import { Box, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from '../../styles/Style.module.css';
import axiosInstance from '../../utils/axios';


export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if( localStorage.getItem('audiophile_admin_token') ) navigate('/admin');
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();

        const toSubmit = { username: username, password: password };

        try {
            const response = await axiosInstance.post('admin/login', toSubmit);

            if(response.data.success) {
                //console.log(response)
                localStorage.setItem('audiophile_admin_token', response.data.adminToken);
                navigate('/admin');
            }
            else {
                alert(response.data.msg);
            }
        } 
        catch(error) {
           console.log(error); 
        }
    }


    return (
        <div>
            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh' gap='2rem'>
                <Typography component='h1' variant='h5' fontWeight={700}>Audiophile Admin Login</Typography>
                
                <form onSubmit={handleSubmit} style={{ width: '15rem' }}>
                    <Box display='flex' flexDirection='column' gap='0.5rem' marginBottom='1rem'>
                        <TextField label='Username' id='username' onChange={(e) => setUsername(e.target.value)} required fullWidth helperText='Username: admin' />
                    </Box>
                    <Box display='flex' flexDirection='column' gap='0.5rem' marginBottom='1.5rem'>
                        <TextField label='Password' id='password' onChange={(e) => setPassword(e.target.value)} required fullWidth helperText='Password: admin' />
                    </Box>

                    <Button type='submit' variant='contained' fullWidth>Login</Button>
                </form>
            </Box>
        </div>
    )
}