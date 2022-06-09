import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '../../styles/Style.module.css';
//import { useGetOrdersQuery } from '../../redux/orderApi';



export default function OrdersPage() {
    //const { data, isFetching } = useGetOrdersQuery();
    //console.log(data)
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        
        async function getOrders() {
            try {
                const response = await axios.get('http://localhost:8000/orders');

                if(response.data.success) {
                    setOrders(response.data.orders);
                }
                else {
                    console.log(response.data.msg);
                }
            } 
            catch(error) {
                console.log(error);    
            }
        }

        getOrders();

        return () => controller.abort();
    }, [])


    return (
        <Box width='100%' padding={{ xs: '1.5rem', md: '2rem'}}>orders</Box>
    )
}