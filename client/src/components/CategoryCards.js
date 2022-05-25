import { Box, Card, CardMedia, CardContent, CardActions, Stack, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import HeadphonesPreview from '../assets/headphones-category-preview.svg';
import SpeakersPreview from '../assets/speakers-category-preview.svg';
import EarphonesPreview from '../assets/earphones-category-preview.svg';
import styles from '../styles/Style.module.css';





export default function CategoryCards() {

    return (
        <Box 
            className='category-cards-container' 
            display='flex' 
            alignItems='center' 
            justifyContent='space-evenly' 
            flexDirection={{ xs: 'column', sm: 'row' }} 
            gap={{ xs: '1rem', xl: '1.5rem' }} 
            marginBottom={{ xs: '7.5rem', md: '6rem', xl: '10rem' }}
        >
            <Card className={styles.categoryCard} elevation={0} sx={{ padding: { xs: '1.5rem 0', md: '2rem 0' } }}>
                <CardMedia>
                    <img src={HeadphonesPreview} alt='' />
                </CardMedia>
                <CardContent>
                    <Typography fontWeight={700}>HEADPHONES</Typography>
                </CardContent>
                <CardActions>
                    <Link to='/category/headphones'>SHOP</Link>
                    <KeyboardArrowRightIcon sx={{ color: 'orange.primary' }} />
                </CardActions>
            </Card>

            <Card className={styles.categoryCard} elevation={0} sx={{ padding: { xs: '1.5rem 0', md: '2rem 0' } }}>
                <CardMedia>
                    <img src={SpeakersPreview} alt='' />
                </CardMedia>
                <CardContent>
                    <Typography fontWeight={700}>SPEAKERS</Typography>
                </CardContent>
                <CardActions>
                    <Link to='/category/speakers'>SHOP</Link>
                    <KeyboardArrowRightIcon sx={{ color: 'orange.primary' }} />
                </CardActions>
            </Card>

            <Card className={styles.categoryCard} elevation={0} sx={{ padding: { xs: '1.5rem 0', md: '2rem 0' } }}>
                <CardMedia>
                    <img src={EarphonesPreview} alt='' />
                </CardMedia>
                <CardContent>
                    <Typography fontWeight={700}>EARPHONES</Typography>
                </CardContent>
                <CardActions>
                    <Link to='/category/earphones'>SHOP</Link>
                    <KeyboardArrowRightIcon sx={{ color: 'orange.primary' }} />
                </CardActions>
            </Card>
        </Box>
    );
}