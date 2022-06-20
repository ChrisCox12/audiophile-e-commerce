import { Box, Typography, Dialog, Button } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart } from '../redux/cartSlice';
import cld from '../utils/cld';
import styles from '../styles/Style.module.css';


export default function OrderCompleteModal({ isComplete, handleClose, cartTotal, shipping }) {
    const [showMore, setShowMore] = useState(false);
    const cart = useSelector(state => state.cart)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    function closeModal() {
        handleClose();
        dispatch( emptyCart() );
        navigate('/');
    }


    return (
        <Dialog className='order-confirmation-modal' open={isComplete} maxWidth='sm' fullWidth keepMounted>
            <Box className='order-confirmation-box' display='flex' flexDirection='column' gap='1rem' padding={{ xs: '2rem', md: '3rem' }}>
                <CheckCircleRoundedIcon fontSize='large' sx={{ color: '#D87D4A' }} />
                <Typography component='h1' variant='h4' fontWeight={700} letterSpacing='0.8px'>THANK YOU FOR YOUR ORDER</Typography>
                <Typography sx={{ opacity: 0.7 }}>You will be receiving an email shortly</Typography>
                
                <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} borderRadius='7px' overflow='hidden'>
                    <div className={styles['order-items']}>
                        {showMore ?
                            (
                                <>
                                    {cart.map(item => (
                                        <div className={styles['order-item']} key={item.slug}>
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                <div className={styles['order-item-image']}>
                                                    <AdvancedImage cldImg={cld.image(item.image)} />
                                                </div>
                                                <div>
                                                    <Typography className={styles['item-name']}>{item.name}</Typography>
                                                    <Typography className={styles['item-price']}>$ {(item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
                                                </div>
                                            </div>
                                            <span className={styles['item-quantity']}>x{item.quantity}</span>
                                        </div>
                                    ))}
            
                                    <div style={{ width: '100%', border: '1px solid black', marginBottom: '0.5rem' }}></div>
                                    <Button fullWidth onClick={() => setShowMore(false)}>Show less</Button>
                                </>
                            )
                            :
                            (
                                <>
                                    <div className={styles['order-item']} key={cart?.at(0)?.slug}>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <div className={styles['order-item-image']}>
                                                <AdvancedImage cldImg={cld.image(cart?.at(0)?.image)} />
                                            </div>
                                            <div>
                                                <Typography className={styles['item-name']}>{cart?.at(0)?.name}</Typography>
                                                <Typography className={styles['item-price']}>$ {(cart?.at(0)?.price)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
                                            </div>
                                        </div>
                                        <span className={styles['item-quantity']}>x{cart?.at(0)?.quantity}</span>
                                    </div>

                                    {cart?.length > 1 && 
                                        <>
                                            <div style={{ width: '100%', border: '1px solid black', marginBottom: '0.5rem' }}></div>
                                            <Button fullWidth onClick={() => setShowMore(true)}>and {cart.length - 1} other item(s)</Button>
                                        </>
                                    }
                                    
                                </>
                            )
                        }
                    </div>

                    <div className={styles['order-total']}>
                        <Typography sx={{ color: 'white', opacity: 0.6 }}>GRAND TOTAL</Typography>
                        <Typography sx={{ color: 'white' }}>$ {(cartTotal + shipping).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
                    </div>
                </Box>
                
                <Button onClick={closeModal} sx={{ bgcolor: '#D87D4A', color: 'white', letterSpacing: '1px', padding: '1rem 0', ':hover': { bgcolor: '#FBAF85' } }}>BACK TO HOME</Button>
            </Box>
        </Dialog>
    )
}