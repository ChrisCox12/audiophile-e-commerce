import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Style.module.css';


export default function OrdersTable({ orders }) {
    const navigate = useNavigate();


    return (
        <TableContainer sx={{ border: '1px solid gray' }}>
            <Table className={styles['order-table']} sx={{ minWidth: '50rem' }}>
                <TableHead>
                    <TableRow>
                        <TableCell className='id'>Order #</TableCell>
                        <TableCell className='date'>Order Date</TableCell>
                        <TableCell className='total'>Order Total ($)</TableCell>
                        <TableCell className='delivered-status'>Delivery Status</TableCell>
                        <TableCell className='name'>Customer Name</TableCell>
                        <TableCell className='email'>Customer Email</TableCell>
                        <TableCell className='actions'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map(order => (
                        <TableRow key={order._id}>
                            <TableCell>{(order._id).substring((order._id.length - 5), order._id.length)}</TableCell>
                            <TableCell>{moment(order.created_at).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                            <TableCell>{(order.orderTotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            <TableCell className={styles['delivery-status']} data-status={`${order.delivered}`}>
                                <div>{order.delivered}</div>
                            </TableCell>
                            <TableCell>{order.customer.name}</TableCell>
                            <TableCell>{order.customer.email}</TableCell>
                            <TableCell>
                                <Button variant='outlined' onClick={() => navigate(`/admin/order/${order._id}`)}>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}