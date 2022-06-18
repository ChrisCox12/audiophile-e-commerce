import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OrderCompleteModal from '../components/OrderComplete';
import CheckoutForm from '../components/CheckoutForm';
import styles from '../styles/Style.module.css';


export default function CheckoutPage() {
    const [total, setTotal] = useState(0);
    const [orderComplete, setOrderComplete] = useState(false);
    const shipping = 15;
    const cart = useSelector(state => state.cart);
    

    useEffect(() => {
        let t = 0;

        cart.map(item => t += (item.price * item.quantity));

        setTotal(t);
    }, [cart]);


    function handleCloseOrderConfirm() {
        setOrderComplete(false);
    }

    function handleCompleteOrder() {
        setOrderComplete(true);
    }


    return (
        <div className={styles['page-container']} style={{ backgroundColor: '#F2F2F2' }}>
            <Box className='checkout-page' maxWidth='70rem' padding={{ xs: '1rem 1.5rem 6rem', md: '3rem 2.5rem 7rem', lg: '3.5rem 0 7rem', xl: '5rem 0 8.5rem' }}>
                <Link className={styles['back-button']} to='/'>Go Back</Link>

                <CheckoutForm completeOrder={handleCompleteOrder} cartTotal={total} shipping={shipping} />
            </Box>

            <OrderCompleteModal isComplete={orderComplete} handleClose={handleCloseOrderConfirm} cartTotal={total} shipping={shipping} />
        </div>
    )
}