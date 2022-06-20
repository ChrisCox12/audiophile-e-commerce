import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Style.module.css';
import { useGetTotalProductsQuery } from '../../redux/productApi';
import { useGetTotalSalesQuery, useGetTotalOrdersQuery, useGetPastYearOrdersQuery, useGetLatestOrdersQuery } from '../../redux/orderApi';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import OrdersTable from '../../components/OrdersTable';
import BarChart from '../../components/BarChart';


export default function AdminDashboardPage() {
    const { data: orders, isFetching: fetchingLatestOrders } = useGetLatestOrdersQuery();
    const { data: pastYearOrders, isFetching: fetchingPastOrders } = useGetPastYearOrdersQuery();
    const { data: totalSales, isFetching: fetchingSales } = useGetTotalSalesQuery();
    const { data: totalProducts, isFetching: fetchingProducts } = useGetTotalProductsQuery();
    const { data: totalOrders, isFetching: fetchingTotalOrders } = useGetTotalOrdersQuery();
    const navigate = useNavigate();


    useEffect(() => {
        if( !localStorage.getItem('audiophile_admin_token') ) navigate('/admin/login');
    }, []);


    if(fetchingLatestOrders && fetchingPastOrders && fetchingSales && fetchingProducts && fetchingTotalOrders) return <Typography>Loading...</Typography>;

    return (
        <Box width='100%' bgcolor='#E1E1E1' padding={{ xs: '1.5rem', md: '2rem' }} sx={{ overflowY: 'scroll' }}>
            <Typography className={styles['page-header']} component='h1' variant='h4'>Admin Dashboard</Typography>

            <Box className={styles['summary-stats']} display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap='1rem' alignItems='center'>
                <div className='total-sales'>
                    <MonetizationOnIcon fontSize='large' sx={{ color: '#D87D4A' }} />
                    <div>
                        <Typography>Total Sales</Typography>
                        <span>$ {(totalSales?.totalSales)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </div>

                <div className='total-orders'>
                    <ShoppingBagIcon fontSize='large' sx={{ color: '#D87D4A' }} />
                    <div>
                        <Typography>Total Orders</Typography>
                        <span>{(totalOrders?.totalOrders)?.toLocaleString()}</span>
                    </div>
                </div>
                
                <div className='total-products'>
                    <InventoryIcon fontSize='large' sx={{ color: '#D87D4A' }} />
                    <div>
                        <Typography>Total Products</Typography>
                        <span>{(totalProducts?.totalProducts)?.toLocaleString()}</span>
                    </div>
                </div>
            </Box>

            <BarChart pastYearOrders={pastYearOrders?.pastYearOrders} />

            <OrdersTable orders={orders?.orders} />
        </Box>
    )
}