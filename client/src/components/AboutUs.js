import { Box, Typography } from '@mui/material';
import styles from '../styles/Style.module.css';


export default function AboutUs() {

    return (
        <Box 
            className={styles['about-us' ]} 
            display='flex' 
            flexDirection={{ xs: 'column', xl: 'row-reverse' }} 
            justifyContent='space-between' 
            gap={{ xs: '2.5rem', md: '3.75rem', xl: '7.5rem' }} 
            height={{ xs: '43.75rem', md: '39.5rem', xl: '36.75rem' }}
        >
            <Box className={styles['about-us-img']} height='100%' width='100%'></Box>

            <Box height='100%' width='100%' textAlign={{ xs: 'center', xl: 'left' }}>
                <Typography component='h1' variant='h3' textTransform='uppercase' fontWeight={500} marginBottom='2rem'>Bringing you the <span style={{ color: '#D87D4A' }}>best</span> audio gear</Typography>
                <Typography>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</Typography>
            </Box>
        </Box>
    );
}