import { Slide, Box, Stack, Modal, Card, CardContent, CardActions, CardMedia, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import HeadphonesPreview from '../assets/headphones-category-preview.svg';
import SpeakersPreview from '../assets/speakers-category-preview.svg';
import EarphonesPreview from '../assets/earphones-category-preview.svg';
import styles from '../styles/Style.module.css';


export default function MobileMenu({ showMenu, closeMenu }) {

    //if(!showMenu) return;

    return (
        <Modal open={showMenu} onClose={closeMenu} sx={{ zIndex: 99 }}>
            <Slide direction='right' in={showMenu} mountOnEnter unmountOnExit>
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        top: { xs: '5.5rem', lg: '6rem' }, 
                        left: 0, 
                        width: '100%', 
                        bgcolor: 'white' 
                    }}
                >
                    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ padding: '2rem 1.5rem', bgcolor: 'black' }}>
                        <Card className={styles.menuCard} elevation={0} >
                            <CardMedia>
                                <img src={HeadphonesPreview} alt='headphones' />
                            </CardMedia>
                            <CardContent>
                                <Typography fontWeight={700}>HEADPHONES</Typography>
                            </CardContent>
                            <CardActions>
                                <Link to='/category/headphones' onClick={closeMenu}>SHOP</Link>
                                <KeyboardArrowRightIcon />
                            </CardActions>
                        </Card>

                        <Card className={styles.menuCard} elevation={0}>
                            <CardMedia>
                                <img src={SpeakersPreview} alt='speakers' />
                            </CardMedia>
                            <CardContent>
                                <Typography fontWeight={700}>SPEAKERS</Typography>
                            </CardContent>
                            <CardActions>
                                <Link to='/category/speakers' onClick={closeMenu}>SHOP</Link>
                                <KeyboardArrowRightIcon />
                            </CardActions>
                        </Card>

                        <Card className={styles.menuCard} elevation={0}>
                            <CardMedia>
                                <img src={EarphonesPreview} alt='earphones'  />
                            </CardMedia>
                            <CardContent>
                                <Typography fontWeight={700}>EARPHONES</Typography>
                            </CardContent>
                            <CardActions>
                                <Link to='/category/earphones' onClick={closeMenu}>SHOP</Link>
                                <KeyboardArrowRightIcon />
                            </CardActions>
                        </Card>
                    </Stack>
                </Box>
            </Slide>
        </Modal>
    )
}