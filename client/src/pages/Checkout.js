import { Box, Typography, Stack, Grid, TextField, Radio, RadioGroup, FormControlLabel, FormControl, Button } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import cld from '../utils/cld';
import { AdvancedImage } from '@cloudinary/react';
import styles from '../styles/Style.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import OrderCompleteModal from '../components/OrderComplete';



export default function CheckoutPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('e-Money');
    const [eMoneyNumber, setEMoneyNumber] = useState('');
    const [eMoneyPin, setEMoneyPin] = useState('');
    const [total, setTotal] = useState(0);
    const [orderComplete, setOrderComplete] = useState(false);
    const [close, setClose] = useState(false);
    const shipping = 15;
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    

    useEffect(() => {
        let t = 0;

        cart.map(item => t += (item.price * item.quantity));

        setTotal(t);
    }, [cart])

    //useEffect(() => {console.log(paymentMethod)}, [paymentMethod])

    function handleCloseOrderConfirm() {
        setOrderComplete(false);
    }


    async function handleSubmit() {
        const toSubmit = {
            customer: {
                name: name,
                email: email,
                phone: phone,
                address: address,
                city: city,
                country: country,
                zip: zip
            },
            cart: cart,
            payment: {
                method: paymentMethod,
                cardNumber: eMoneyNumber,
                cardPin: eMoneyPin
            },
            orderTotal: total
        };

        try {
            const response = await axios.post('http://localhost:8000/orders', toSubmit);

            //console.log(response);

            if(response.data.success) {
                setOrderComplete(true);
            }
            else {
                alert(response.data.msg);
            }
        } 
        catch(error) {
            console.log(error);    
        }
    }

    function CustomControlLabel(props) {
        return (
            <FormControlLabel 
                control={<Radio color='default' sx={{ '&.Mui-checked': { color: 'orange.primary' } }} />}
                sx={{ 
                    border: paymentMethod === props.value ? '2px solid #D87D4A' : '1px solid grey', 
                    margin: '0', 
                    borderRadius: '7px',
                    '.MuiTypography-root': { fontWeight: 700 }
                }}
                {...props}
            />
        )
    }


    return (
        <div className={styles['page-container']} style={{ backgroundColor: '#F2F2F2' }}>
            <Box className='checkout-page' maxWidth='70rem' padding={{ xs: '1rem 1.5rem 6rem', md: '3rem 2.5rem 7rem', lg: '3.5rem 0 7rem', xl: '5rem 0 8.5rem' }}>
                <Link className={styles['back-button']} to='/'>Go Back</Link>

                <Box className='checkout-content' display='flex' flexDirection={{ xs: 'column', xl: 'row' }} gap='2rem'>
                    <Box className={styles['customer-form']} width={{ xs: '100%', xl: '70%' }} padding={{ xs: '1.5rem 1.5rem 2rem', md: '2rem 1.5rem', lg: '2.5rem', xl: '3.5rem 3rem' }}>
                        <Typography component='h1' variant='h3' fontWeight={700} marginBottom={{ xs: '2rem', md: '2.5rem' }}>CHECKOUT</Typography>

                        <Box marginBottom={{ xs: '2rem', md: '3rem', xl: '4rem' }}>
                            <Typography className={styles['form-section-head']} component='h3' variant='h5'>BILLING DETAILS</Typography>
                            
                            <Grid container columnSpacing='1rem' rowSpacing='1.5rem'>
                                <Grid className={styles['form-input']} item xs={12} md={6}>
                                    <label htmlFor='name'>Name</label>
                                    <input type='text' id='name' name='name' onChange={(e) => setName(e.target.value)} />
                                </Grid>
                                <Grid className={styles['form-input']} item xs={12} md={6}>
                                    <label htmlFor='email'>Email Address</label>
                                    <input type='email' id='email' name='email' onChange={(e) => setEmail(e.target.value)} required />
                                    <span>Please format email correctly (ex: abc@abc.com)</span>
                                </Grid>
                                <Grid className={styles['form-input']} item xs={12} md={6}>
                                    <label htmlFor='phone'>Phone Number</label>
                                    <input type='text' id='phone' name='phone' onChange={(e) => setPhone(e.target.value)} />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box marginBottom={{ xs: '2rem', md: '3rem', xl: '4rem' }}>
                            <Typography className={styles['form-section-head']} component='h3' variant='h5'>SHIPPING INFO</Typography>
                            
                            <Grid container columnSpacing='1rem' rowSpacing='1.5rem'>
                                <Grid className={styles['form-input']} item xs={12}>
                                    <label htmlFor='address'>Your Address</label>
                                    <input type='text' id='address' name='address' onChange={(e) => setAddress(e.target.value)} required />
                                </Grid>
                                <Grid className={styles['form-input']} item xs={12} md={6}>
                                    <label htmlFor='zip'>ZIP Code</label>
                                    <input type='text' id='zip' name='zip' onChange={(e) => setZip(e.target.value)} required />
                                </Grid>
                                <Grid className={styles['form-input']} item xs={12} md={6}>
                                    <label htmlFor='city'>City</label>
                                    <input type='text' id='city' name='city' onChange={(e) => setCity(e.target.value)} required />
                                </Grid>
                                <Grid className={styles['form-input']} item xs={12} md={6}>
                                    <label htmlFor='country'>Country</label>
                                    <input type='text' id='country' name='country' onChange={(e) => setCountry(e.target.value)} required />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box>
                            <Typography className={styles['form-section-head']} component='h3' variant='h5'>PAYMENT DETAILS</Typography>
                            
                            <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} justifyContent='space-between' gap='1rem' marginBottom='2rem'>
                                <Typography width='100%' fontWeight={700}>Payment Method</Typography>
                                
                                <RadioGroup defaultValue='e-Money' value={paymentMethod} sx={{ gap: '1rem', width: '100%' }} onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <CustomControlLabel value='e-Money' label='e-Money' />
                                    <CustomControlLabel value='cash' label='Cash on Delivery' />
                                </RadioGroup>
                            </Box>

                            {paymentMethod === 'e-Money' ? 
                                (
                                    <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap='1rem'>
                                        <div className={styles['form-input']}>
                                            <Typography fontWeight={700}>e-Money Number</Typography>
                                            <input type='text' id='e-money-number' name='e-money-number' onChange={(e) => setEMoneyNumber(e.target.value)} />
                                        </div>
                                        <div className={styles['form-input']}>
                                            <Typography fontWeight={700}>e-Money PIN</Typography>
                                            <input type='text' id='e-money-pin' name='e-money-pin' onChange={(e) => setEMoneyPin(e.target.value)} />
                                        </div>
                                    </Box>
                                ) 
                                : 
                                (
                                    <Box display='flex' gap='2rem'>
                                        <LocalShippingOutlinedIcon fontSize='large' sx={{ color: '#D87D4A' }} />
                                        <Typography sx={{ opacity: 0.7 }}>The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</Typography>
                                    </Box>
                                )
                            }
                        </Box>
                    </Box>

                    <Box className={styles['order-summary']} width={{ xs: '100%', xl: '30%' }} padding={{ xs: '2rem 1.5rem', md: '2rem' }}>
                        <Typography component='h2' variant='h4' fontWeight={700} marginBottom='2rem'>SUMMARY</Typography>

                        {cart.map(item => (
                            <Box className={styles['order-item']} key={item.slug}>
                                <Box display='flex' gap='1rem' alignItems='center'>
                                    <div className={styles['order-item-image']}>
                                        <AdvancedImage cldImg={cld.image(item.image)} />
                                    </div>

                                    <div>
                                        <Typography className={styles['item-name']}>{item.name}</Typography>
                                        <Typography className={styles['item-price']}>$ {item.price}</Typography>
                                    </div>
                                </Box>
                                <span className={styles['item-quantity']}>x{item.quantity}</span>
                            </Box>
                        ))}

                        <Stack spacing={3}>
                            <div className={styles['summary-info']}>
                                <Typography>TOTAL</Typography>
                                <span>$ {total.toLocaleString()}</span>
                            </div>
                            <div className={styles['summary-info']}>
                                <Typography>SHIPPING</Typography>
                                <span>$ {shipping}</span>
                            </div>
                            <div className={styles['summary-info']}>
                                <Typography>GRAND TOTAL</Typography>
                                <span>$ {(total + shipping).toLocaleString()}</span>
                            </div>
                        </Stack>

                        <Button className={styles['pay-button']} onClick={handleSubmit}>CONTINUE & PAY</Button>
                    </Box>
                </Box>
            </Box>

            <OrderCompleteModal isComplete={orderComplete} handleClose={handleCloseOrderConfirm} cartTotal={total} />
        </div>
    )
}