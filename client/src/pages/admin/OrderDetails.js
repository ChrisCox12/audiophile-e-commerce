import { Box, Typography, Grid, Select, TableContainer, Table, TableRow, TableHead, TableBody, TableCell, MenuItem, Button } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useGetOrderByIdQuery } from '../../redux/orderApi';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import styles from '../../styles/Style.module.css';


export default function OrderDetailsPage() {
    const { orderId } = useParams();
    const { data: order, isFetching } = useGetOrderByIdQuery(orderId);
    const [deliveryStatus, setDeliveryStatus] = useState('');
    const [baseStatus, setBaseStatus] = useState('');
    const [errorMsg, setErrorMsg] = useState('');


    useEffect(() => {
        if(!isFetching) {
            setDeliveryStatus(order.order.delivered);
            setBaseStatus(order.order.delivered);
        }
    }, [order, isFetching]);


    async function handleClick(e) {
        e.preventDefault();

        try {
            const response = await axiosInstance.patch(`orders/delivery/${order.order._id}`, { status: deliveryStatus });

            if(response.data.success) {
                setBaseStatus(deliveryStatus);
            }
            else {
                //alert(response.data.msg);
                setErrorMsg(response.data.msg);
            }
        } 
        catch(error) {
            console.log(error);     
        }
    }


    if(isFetching) return <Typography>Loading...</Typography>;

    return (
        <Box padding={{ xs: '1.5rem' }} bgcolor='#E1E1E1' sx={{ width: '100%', overflowY: 'scroll', height: '100%' }}>
            <Link className={styles['back-button-alt']} to='/admin/orders'>
                <ArrowBackIosNewRoundedIcon />
                <span>Go Back</span>
            </Link>

            <Typography component='h1' variant='h4' fontWeight={700} marginBottom='2.5rem'>Order Details</Typography> 

            <div className={styles['order-info']}>
                <Grid className={styles['order-info-grid']} container>
                    <Grid item xs={12}>
                        <Typography component='h2' variant='h6' fontWeight={700}>Basic Info</Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={12} sm={4}>
                            <Typography className={styles['grid-section-head']} component='div' fontWeight={600}>Customer</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div>
                                <Typography className={styles['grid-section-cell']}>{order.order.customer.name}</Typography>
                                <Typography className={styles['grid-section-cell']}>{order.order.customer.address}</Typography>
                                <Typography className={styles['grid-section-cell']}>{order.order.customer.city}</Typography>
                                <Typography className={styles['grid-section-cell']}>{order.order.customer.country}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid className={styles['grid-section-head']} item xs={12} sm={4}>ID</Grid>
                        <Grid className={styles['grid-section-cell']} item xs={12} sm={8}>{order.order._id}</Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid className={styles['grid-section-head']} item xs={12} sm={4}>Date</Grid>
                        <Grid className={styles['grid-section-cell']} item xs={12} sm={8}>{moment(order.order.created_at).format('MMMM Do YYYY, h:mm a')}</Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid className={styles['grid-section-head']} item xs={12} sm={4}>Order Total</Grid>
                        <Grid className={styles['grid-section-cell']} item xs={12} sm={8}>$ {(order.order.orderTotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid className={styles['grid-section-head']} item xs={12} sm={4}>Payment Method</Grid>
                        <Grid className={styles['grid-section-cell']} item xs={12} sm={8}>{order.order.payment.method}</Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid className={styles['grid-section-head']} item xs={12} sm={4}>Status</Grid>
                        <Grid item xs={12} sm={8}>
                            {errorMsg && <Typography textAlign='center' bgcolor='red' color='white' fontWeight={700} borderRadius='7px' padding='0.5rem'>Error: {errorMsg}</Typography>}
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Select value={deliveryStatus} onChange={(e) => setDeliveryStatus(e.target.value)} sx={{ width: '100%' }}>
                                    <MenuItem value='Pending'>Pending</MenuItem>
                                    <MenuItem value='Delivered'>Delivered</MenuItem>
                                    <MenuItem value='Canceled'>Canceled</MenuItem>
                                </Select>

                                <div style={{ width: '100%' }}>
                                    <Button variant='contained' sx={{ marginRight: '1.5rem', bgcolor: '#D87D4A', fontWeight: 700, letterSpacing: '1px' }} disabled={deliveryStatus === baseStatus} onClick={handleClick}>Save</Button>
                                    <Button disabled={deliveryStatus === baseStatus} onClick={() => setDeliveryStatus(order.order.delivered)} sx={{ letterSpacing: '1px', color: '#D87D4A', fontWeight: 700, }}>Cancel</Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

            <div className='order-items'>
                <TableContainer>
                   <Table className={styles['order-items-table']}>
                       <TableHead>
                           <TableRow>
                               <TableCell>
                                   <Typography component='h2' variant='h6' fontWeight={700}>Order Items</Typography>
                                </TableCell>
                               <TableCell></TableCell>
                               <TableCell></TableCell>
                           </TableRow>
                       </TableHead>
                       <TableBody>
                            <TableRow>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Amount ($)</TableCell>
                            </TableRow>

                           {order.order.cart.map((item, index) => (
                               <TableRow key={index}>
                                   <TableCell>{item.name}</TableCell>
                                   <TableCell>{item.quantity}</TableCell>
                                   <TableCell>{(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                               </TableRow>
                           ))}
                       </TableBody>
                   </Table>
               </TableContainer>
            </div>
        </Box>
    )
}