import { Box, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AboutUs from "../components/AboutUs";
import CategoryCards from "../components/CategoryCards";
import styles from '../styles/Style.module.css';




export default function HomePage() {
    return (
        <div>
            Home Page
            <Box className='home-page-content' padding={{ xs: '1.5rem', md: '2.5rem', xl: '10rem' }}>
                <CategoryCards />

                <Stack className='home-page-showcase' spacing={{ xs: 2, md: 4, xl: 6 }}>
                    <Box className={styles['showcase-a']} height={{ xs: '37.5rem', md: '45rem', xl: '35rem' }} padding={{ xs: '3.5rem 0', xl: '6rem 0 0' }}>
                        <Box className={styles['showcase-a-img']} width={{ xs: '100%', xl: '60%' }} height={{ xs: '40%', xl: '100%' }}></Box>

                        <Box>
                            <Typography>ZX9 SPEAKER</Typography>
                            <Typography>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</Typography>
                            <Link to='/product/zx9-speaker'>SEE PRODUCT</Link>
                        </Box>
                    </Box>

                    <Box className={styles['showcase-b']}></Box>

                    <Box className='showcase-c' display='flex' flexDirection={{ xs: 'column', md: 'row' }} justifyContent='space-between'>
                        <Box className='showcase-c-img'></Box>

                        <Box>
                            <Typography>YX1 EARPHONES</Typography>

                            <Link to='/product/yx1-earphones'>SEE PRODUCT</Link>
                        </Box>
                    </Box>
                </Stack>

                <AboutUs />
            </Box>
            
        </div>
    )
}