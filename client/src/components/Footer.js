import { Box, Typography, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/audiophile 2.svg';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import styles from '../styles/Style.module.css';


export default function Footer() {
    
    return (
        <Box className={styles['footer-container']} bgcolor='black'  padding={{ xs: '3.25rem 1.5rem 2rem', md: '3.75rem 2.5rem 3rem', lg: '4.5rem 10rem 3rem' }}>
            <div className='footer-content'>
                <Box 
                    display='flex' 
                    flexDirection={{ xs: 'column', md: 'row' }} 
                    gap={{ xs: '3rem', sm: '2rem', md: '0' }} 
                    alignItems={{ xs: 'center', sm: 'flex-start' }} 
                    justifyContent={{ md: 'space-between' }}
                >
                    <img src={logo} alt='' />

                    <Stack 
                        className={styles['footer-links']} 
                        spacing={2} 
                        direction={{ xs: 'column', sm: 'row' }} 
                        textAlign='center'
                    >
                        <Link to='/'>HOME</Link>
                        <Link to='/category/headphones'>HEADPHONES</Link>
                        <Link to='/category/speakers'>SPEAKERS</Link>
                        <Link to='/category/earphones'>EARPHONES</Link>
                    </Stack>
                </Box>

                <Typography 
                    className='footer-description' 
                    textAlign={{ xs: 'center', sm: 'left' }} 
                    marginTop={{ xs: '3rem', sm: '2rem' }} 
                    marginBottom={{ xs: '3rem', sm: '5rem', md: '3.5rem' }} 
                    width={{ xl: '50%' }}
                >
                    Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we're open 7 days a week.
                </Typography>

                <Box 
                    display='flex' 
                    alignItems='center' 
                    justifyContent='space-between' 
                    flexDirection={{ xs: 'column', sm: 'row' }} 
                    gap={{ xs: '3rem', sm: '0' }}
                >
                    <Typography>Copyright 2021. All Rights Reserved</Typography>

                    <Stack className='footer-socials' spacing={2} direction='row'>
                        <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'><FacebookIcon sx={{ color: 'white' }} /></a>
                        <a href='https://twitter.com/' target='_blank' rel='noreferrer'><TwitterIcon sx={{ color: 'white' }} /></a>
                        <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'><InstagramIcon sx={{ color: 'white' }} /></a>
                    </Stack>
                </Box>
            </div>
        </Box>
    )
}