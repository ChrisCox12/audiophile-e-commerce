import { Box, Typography, Stack, Grid, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { AdvancedImage } from '@cloudinary/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import cld from '../utils/cld';
import axiosInstance from '../utils/axios';
import styles from '../styles/Style.module.css';


export default function CheckoutForm({ completeOrder, cartTotal, shipping }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardNumberMessage, setCardNumberMessage] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvc, setCvc] = useState('');
    const [cvcMessage, setCvcMessage] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [expirationMessage, setExpirationMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const cart = useSelector(state => state.cart);
    


    function handleCardInput(e) {
        const numberRegex = new RegExp('[0-9]{16}');
        const cvcRegex = new RegExp('[0-9]{3}');
        const expirationRegex = new RegExp('^(0[1-9]|1[0-2])\/([2-9][2-9])$');

        switch(e.target.name) {
            case 'card-number':
                if(e.target.value.length > 16) return;

                setCardNumber(e.target.value);

                if(!numberRegex.test(e.target.value)) {
                    setCardNumberMessage('Invalid Number');
                }
                else {
                    setCardNumberMessage('');
                }
                break;
            case 'expiration-date':
                if(e.target.value.length > 5) return;

                setExpirationDate(e.target.value);

                if(!expirationRegex.test(e.target.value)) {
                    setExpirationMessage('Invalid Date');
                }
                else {
                    setExpirationMessage('');
                }
                break;
            case 'cvc':
                if(e.target.value.length > 3) return;

                setCvc(e.target.value);
                
                if(!cvcRegex.test(e.target.value)) {
                    setCvcMessage('Invalid CVC');
                }
                else {
                    setCvcMessage('');
                }
                break;
            default:
                break;
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();

        if(name.length === 0 || email.length === 0 || address.length === 0 || zip.length === 0 || city.length === 0 || country.length === 0) return;

        let invalidCard = false;

        if(paymentMethod === 'card') {
            if(cardNumber.length === 0) {
                setCardNumberMessage('Invalid Number');
                invalidCard = true;
            }
            if(cvc.length === 0) {
                setCvcMessage('Invalid CVC');
                invalidCard = true;
            }
            if(expirationDate.length === 0) {
                setExpirationMessage('Invalid Date');
                invalidCard = true;
            }

            if(invalidCard) return;
        }

        setLoading(true);

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
                cardNumber: cardNumber,
                cvc: cvc,
                expirationDate: expirationDate
            },
            orderTotal: (cartTotal + shipping)
        };

        try {
            const response = await axiosInstance.post('orders', toSubmit);

            if(response.data.success) {
                setLoading(false);
                completeOrder();
            }
            else {
                setErrorMsg(response.data.msg);
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
        <Box className='checkout-content' display='flex' flexDirection={{ xs: 'column', xl: 'row' }} gap='2rem'>
            <Box className={styles['customer-form']} width={{ xs: '100%', xl: '70%' }} padding={{ xs: '1.5rem 1.5rem 2rem', md: '2rem 1.5rem', lg: '2.5rem', xl: '3.5rem 3rem' }}>
                <Typography component='h1' variant='h3' fontWeight={700} marginBottom={{ xs: '2rem', md: '2.5rem' }}>CHECKOUT</Typography>

                {errorMsg && <Typography textAlign='center' bgcolor='red' color='white' fontWeight={700} borderRadius='7px' padding='0.5rem'>Error: {errorMsg}</Typography>}
                
                <Box marginBottom={{ xs: '2rem', md: '3rem', xl: '4rem' }}>
                    <Typography className={styles['form-section-head']} component='h3' variant='h5'>BILLING DETAILS</Typography>
                    
                    <Grid container columnSpacing='1rem' rowSpacing='1.5rem'>
                        <Grid className={styles['form-input']} item xs={12} md={6}>
                            <label htmlFor='name'>Name</label>
                            <input type='text' id='name' name='name' onChange={(e) => setName(e.target.value)} required />
                            <span>Please enter your name</span>
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
                            <span>Please enter your address</span>
                        </Grid>
                        <Grid className={styles['form-input']} item xs={12} md={6}>
                            <label htmlFor='zip'>ZIP Code</label>
                            <input type='text' id='zip' name='zip' onChange={(e) => setZip(e.target.value)} required />
                            <span>Please enter your ZIP code</span>
                        </Grid>
                        <Grid className={styles['form-input']} item xs={12} md={6}>
                            <label htmlFor='city'>City</label>
                            <input type='text' id='city' name='city' onChange={(e) => setCity(e.target.value)} required />
                            <span>Please enter your City</span>
                        </Grid>
                        <Grid className={styles['form-input']} item xs={12} md={6}>
                            <label htmlFor='country'>Country</label>
                            <input type='text' id='country' name='country' onChange={(e) => setCountry(e.target.value)} required />
                            <span>Please enter your Country</span>
                        </Grid>
                    </Grid>
                </Box>

                <Box>
                    <Typography className={styles['form-section-head']} component='h3' variant='h5'>PAYMENT DETAILS</Typography>
                    
                    <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} justifyContent='space-between' gap='1rem' marginBottom='2rem'>
                        <Typography width='100%' fontWeight={700}>Payment Method</Typography>
                        
                        <RadioGroup defaultValue='card' value={paymentMethod} sx={{ gap: '1rem', width: '100%' }} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <CustomControlLabel value='card' label='Card' />
                            <CustomControlLabel value='cash' label='Cash on Delivery' />
                        </RadioGroup>
                    </Box>

                    {paymentMethod === 'card' ? 
                        (
                            <>
                                <div>
                                    <Grid container spacing={2}>
                                        <Grid className={styles['form-input']} item xs={12} md={6}>
                                            <label htmlFor='card-number'>Card Number</label>
                                            <input type='text' name='card-number' id='card-number' value={cardNumber} onChange={handleCardInput} />
                                            {cardNumberMessage && <div>{cardNumberMessage}</div>}
                                        </Grid>
                                        <Grid className={styles['form-input']} item xs={6} md={3}>
                                            <label htmlFor='expiration-date'>Expiration (MM/YY)</label>
                                            <input type='text' name='expiration-date' id='expiration-date' value={expirationDate} onChange={handleCardInput} />
                                            {expirationMessage && <div>{expirationMessage}</div>}
                                        </Grid>
                                        <Grid className={styles['form-input']} item xs={6} md={3}>
                                            <label htmlFor='cvc'>CVC</label>
                                            <input type='text' name='cvc' id='cvc' value={cvc} onChange={handleCardInput} />
                                            {cvcMessage && <div>{cvcMessage}</div>}
                                        </Grid>
                                    </Grid>
                                </div>
                            </>
                        ) 
                        : 
                        (
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <LocalShippingOutlinedIcon fontSize='large' sx={{ color: '#D87D4A' }} />
                                <Typography sx={{ opacity: 0.7 }}>The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</Typography>
                            </div>
                        )
                    }
                </Box>
            </Box>

            <Box className={styles['order-summary']} width={{ xs: '100%', xl: '30%' }} padding={{ xs: '2rem 1.5rem', md: '2rem' }}>
                <Typography component='h2' variant='h4' fontWeight={700} marginBottom='2rem'>SUMMARY</Typography>

                {cart.map(item => (
                    <div className={styles['order-item']} key={item.slug}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div className={styles['order-item-image']}>
                                <AdvancedImage cldImg={cld.image(item.image)} />
                            </div>

                            <div>
                                <Typography className={styles['item-name']}>{item.name}</Typography>
                                <Typography className={styles['item-price']}>$ {item.price}</Typography>
                            </div>
                        </div>
                        <span className={styles['item-quantity']}>x{item.quantity}</span>
                    </div>
                ))}

                <Stack spacing={3}>
                    <div className={styles['summary-info']}>
                        <Typography>TOTAL</Typography>
                        <span>$ {cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className={styles['summary-info']}>
                        <Typography>SHIPPING</Typography>
                        <span>$ {shipping}</span>
                    </div>
                    <div className={styles['summary-info']}>
                        <Typography>GRAND TOTAL</Typography>
                        <span>$ {(cartTotal + shipping).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </Stack>

                <Button className={styles['pay-button']} onClick={handleSubmit} disabled={loading || cart.length === 0}>{loading ? <CircularProgress /> : <>CONTINUE & PAY</>}</Button>
            </Box>
        </Box>
    )
}