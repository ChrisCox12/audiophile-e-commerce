import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AboutUs from '../components/AboutUs';
import CategoryCards from '../components/CategoryCards';
import styles from '../styles/Style.module.css';


export default function HomePage() {
    
    return (
        <div>
            <Box className='home-page-content' padding={{ xs: '2.5rem 1.5rem 7.5rem', md: '6rem 2.5rem', xl: '7.5rem 10rem 12.5rem' }}>
                <CategoryCards />

                <Stack 
                    className='home-page-showcase' 
                    spacing={{ xs: 3, md: 4, xl: 6 }} 
                    marginBottom={{ xs: '7.5rem', md: '6rem', xl: '12.5rem' }}
                >
                    <Box 
                        className={styles['showcase-a']} 
                        display='flex' 
                        flexDirection={{ xs: 'column', xl: 'row' }} 
                        gap={{ xs: '2rem', md: '4rem', xl: '8.75rem' }} 
                        height={{ xs: '37.5rem', md: '45rem', xl: '35rem' }} 
                        padding={{ xs: '3.5rem 1.5rem', md: '3.5rem 10.5rem', xl: '6rem 6rem 0 7.5rem' }}
                    >
                        <div className={styles['showcase-a-img']}></div>

                        <Box textAlign={{ xs: 'center', xl: 'left' }} width='100%'  height='100%'>
                            <Typography component='h1' variant='h3' fontWeight={700} letterSpacing='2px' marginBottom='1.5rem'>ZX9 <br/> SPEAKER</Typography>
                            <Typography fontWeight={500} marginBottom={{ xs: '1.5rem', md: '2.5rem' }}>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</Typography>
                            <Link to='/product/zx9-speaker'>SEE PRODUCT</Link>
                        </Box>
                    </Box>

                    <Box 
                        className={styles['showcase-b']} 
                        paddingLeft={{ xs: '1.5rem', md: '4rem', xl: '6rem' }} 
                        height='20rem' 
                        gap='2rem'
                    >
                        <Typography component='h2' variant='h5' fontWeight={600} letterSpacing='2px'>ZX7 SPEAKER</Typography>
                        <Link to='/product/zx7-speaker'>SEE PRODUCT</Link>
                    </Box>

                    <Box 
                        className={styles['showcase-c']} 
                        display='flex' 
                        flexDirection={{ xs: 'column', md: 'row' }} 
                        justifyContent='space-between' 
                        gap={{ xs: '1.5rem', md: '1rem', xl: '2rem' }}
                        height={{ xs: '26.5rem', md: '20rem' }} 
                    >
                        <div className={styles['showcase-c-img']}></div>

                        <Box className={styles['showcase-c-link-container']} paddingLeft={{ xs: '1.5rem', md: '2.5rem', xl: '6rem' }}>
                            <Typography component='h2' variant='h5' fontWeight={600} letterSpacing='2px'>YX1 EARPHONES</Typography>
                            <Link to='/product/yx1-earphones'>SEE PRODUCT</Link>
                        </Box>
                    </Box>
                </Stack>

                <AboutUs />
            </Box>
            
        </div>
    );
}