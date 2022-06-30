import { Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios';


export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
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
                localStorage.setItem('audiophile_admin_token', response.data.adminToken);

                navigate('/admin');
            }
            else {
                setErrorMsg(response.data.msg);
            }
        } 
        catch(error) {
           console.log(error); 
        }
    }


    return (
        <div 
            style={{ 
                backgroundColor: '#D87D4A', 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}
        >
            <div 
                className='login-form-container' 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '2rem', 
                    backgroundColor: 'white', 
                    padding: '2rem', 
                    borderRadius: '7px' 
                }}
            >
                <Typography component='h1' variant='h5' fontWeight={700}>Audiophile Admin Login</Typography>

                {errorMsg && <Typography textAlign='center' bgcolor='red' color='white' fontWeight={700} borderRadius='7px' padding='0.5rem'>Error: {errorMsg}</Typography>}
                
                <form className='login-form' onSubmit={handleSubmit} style={{ width: '15rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <TextField
                            label='Username'
                            id='username'
                            required
                            fullWidth
                            helperText='Username: admin'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <TextField
                            label='Password'
                            id='password'
                            required
                            fullWidth
                            helperText='Password: admin'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button type='submit' variant='contained' fullWidth>Login</Button>
                </form>
            </div>
        </div>
    )
}