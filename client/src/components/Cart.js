import { Slide, Box, Modal, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import cld from '../utils/cld';
import styles from '../styles/Style.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { emptyCart, incrementItem, decrementItem, removeItem } from '../redux/cartSlice';


export default function Cart({ showCart, closeCart }) {
    const [total, setTotal] = useState(0);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    //if(!showCart) return;

    useEffect(() => {
        let t = 0;

        cart.map(item => (
            t += (item.price * item.quantity)
        ));

        setTotal(t);
    }, [cart]);
    

    function updateItem(option, item) {
        if(option === 'increment') {
            if(item.quantity === 10) return;
            
            dispatch( incrementItem(item.slug) );
        }
        else {
            if(item.quantity === 1) {
                dispatch( removeItem(item.slug) );
            }
            else {
                dispatch( decrementItem(item.slug) );
            }
        }
    }

    function handleEmptyCart() {
        dispatch( emptyCart() );
    }


    return (
        <Modal open={showCart} onClose={closeCart} sx={{ zIndex: 98 }}>
            <Slide direction='left' in={showCart} mountOnEnter unmountOnExit>
                <Box
                    width={{ xs: 'calc(100% - 3rem)', sm: '50%', lg: '30%' }}
                    padding={{ xs: '2rem 1.5rem', sm: '2rem' }}
                    sx={{ 
                        position: 'absolute',
                        top: { xs: 'calc(5.5rem + 1.5rem)', lg: 'calc(6rem + 2rem)' },
                        right: { sm: '2.5rem', lg: '10rem' },
                        left: { xs: '1rem', sm: 'auto' },
                        bgcolor: 'white',
                        borderRadius: '7px'
                    }}
                >
                    <Stack spacing={4}>
                        <Box display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography fontWeight={700}>CART ({cart.length})</Typography>
                            <Button className={styles.removeAllButton} onClick={handleEmptyCart}>Remove all</Button>
                        </Box>

                        {cart.map(item => (
                            <Box display='flex' alignItems='center' justifyContent='space-between' key={item.slug}>
                                <Box display='flex' alignItems='center' gap='1rem'>
                                    <AdvancedImage cldImg={cld.image(item.image)} style={{ width: '4rem', height: '4rem', backgroundColor: '#F1F1F1', borderRadius: '7px', padding: '0.75rem' }} />
                                    <div>
                                        <Typography fontWeight={700}>{item.name}</Typography>
                                        <Typography fontWeight={600} sx={{ opacity: 0.7 }}>$ {(item.price).toLocaleString()}</Typography>
                                    </div>
                                </Box>

                                <Box className={styles['item-quantity-update-box']}>
                                    <Button className={styles['cart-quantity-button']} onClick={() => updateItem('decrement', item)}>-</Button>
                                    {item.quantity}
                                    <Button className={styles['cart-quantity-button']} onClick={() => updateItem('increment', item)}>+</Button>
                                </Box>
                            </Box>
                        ))}

                        <Box className={styles['cart-total-box']} display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography>TOTAL</Typography>
                            <span>$ {total.toLocaleString()}</span>
                        </Box>

                        <Link className={styles['cart-checkout-button']} to='/checkout' onClick={closeCart}>CHECKOUT</Link>
                    </Stack>
                </Box>
            </Slide>
        </Modal>
    )
}