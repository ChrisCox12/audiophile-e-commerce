import { Slide, Box, Modal, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../styles/Style.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { emptyCart } from '../redux/cartSlice';


export default function Cart({ showCart, closeCart }) {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    //if(!showCart) return;

    return (
        <Modal open={showCart} sx={{ zIndex: 98 }}>
            <Slide direction='left' in={showCart} mountOnEnter unmountOnExit>
                <Box
                    width={{ xs: 'calc(100% - 3rem)', sm: '50%', lg: '30%' }}
                    padding={{ xs: '2rem 1.5rem', sm: '2rem' }}
                    sx={{ 
                        position: 'absolute',
                        top: { xs: 'calc(5.5rem + 1.5rem)', lg: 'calc(6rem + 2rem)' },
                        right: { sm: '2.5rem', lg: '10rem' },
                        bgcolor: 'white',
                        borderRadius: '7px'
                    }}
                >
                    <Stack spacing={4}>
                        <Box display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography>CART ({cart.length})</Typography>
                            <Button className={styles.removeAllButton} variant='text' onClick={() => dispatch( emptyCart() )}>Remove all</Button>
                        </Box>

                        {}

                        <Link to='/checkout' onClick={() => closeCart()}>Checkout</Link>
                    </Stack>
                </Box>
            </Slide>
        </Modal>
    )
}