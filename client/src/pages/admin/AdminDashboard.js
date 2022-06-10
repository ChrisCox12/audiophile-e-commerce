import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '../../styles/Style.module.css';
import { useGetTotalProductsQuery } from '../../redux/productApi';
import { useGetTotalSalesQuery, useGetTotalOrdersQuery, useGetPastYearOrdersQuery } from '../../redux/orderApi';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';

import OrdersTable from '../../components/OrdersTable';
import BarChart from '../../components/BarChart';


export default function AdminDashboardPage() {
    const [orders, setOrders] = useState([]);
    //const [pastYearOrders, setPastYearOrders] = useState([]);
    const { data: pastYearOrders, isFetching: fetchingPastOrders } = useGetPastYearOrdersQuery();
    const { data: totalSales, isFetching: fetchingSales } = useGetTotalSalesQuery();
    const { data: totalProducts, isFetching: fetchingProducts } = useGetTotalProductsQuery();
    const { data: totalOrders, isFetching: fetchingTotalOrders } = useGetTotalOrdersQuery();

    //console.log(pastYearOrders)

    
    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            try {
                const response = await axios.get('http://localhost:8000/orders/latestOrders');

                if(response.data.success) {
                    setOrders(response.data.orders);
                }
            } 
            catch(error) {
                console.log(error);    
            }
        }

        getData();

        return () => controller.abort();
    }, [])



    return (
        <Box width='100%' padding={{ xs: '1.5rem', md: '2rem'}}>
            <Typography>Admin Dashboard</Typography>

            <Box className='summary-stats' display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap='1.5rem' alignItems='center'>
                <Box className='total-sales' display='flex' alignItems='center' border='1px solid red' gap='1rem' padding='1rem' width='100%'>
                    <MonetizationOnIcon fontSize='large' />
                    <div>
                        <Typography>Total Sales</Typography>
                        <span>$ {(totalSales?.totalSales)?.toLocaleString()}</span>
                    </div>
                </Box>
                <Box className='total-orders' display='flex' alignItems='center' border='1px solid red' gap='1rem' padding='1rem' width='100%'>
                    <ShoppingBagIcon fontSize='large' />
                    <div>
                        <Typography>Total Orders</Typography>
                        <span>{(totalOrders?.totalOrders)?.toLocaleString()}</span>
                    </div>
                </Box>
                <Box className='total-products' display='flex' alignItems='center' border='1px solid red' gap='1rem' padding='1rem' width='100%'>
                    <InventoryIcon fontSize='large' />
                    <div>
                        <Typography>Total Products</Typography>
                        <span>{(totalProducts?.totalProducts)?.toLocaleString()}</span>
                    </div>
                </Box>
            </Box>

            <BarChart pastYearOrders={pastYearOrders?.pastYearOrders} />

            <OrdersTable orders={orders} />
        </Box>
    )
}