import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useGetOrdersQuery } from '../../redux/orderApi';
import OrdersTable from '../../components/OrdersTable';
import styles from '../../styles/Style.module.css';


export default function OrdersPage() {
    const { data: orders, isFetching } = useGetOrdersQuery();
    const navigate = useNavigate();

    
    useEffect(() => {
        if(!localStorage.getItem('audiophile_admin_token')) navigate('/admin/login');
    }, [])


    if(isFetching) return <Typography>Loading...</Typography>;

    return (
        <Box width='100%' overflow='scroll' bgcolor='#E1E1E1' padding={{ xs: '1.5rem', md: '2rem'}}>
            <Typography className={styles['page-header']} component='h1' variant='h4'>Orders</Typography>

            <OrdersTable orders={orders?.orders} />
        </Box>
    )
}