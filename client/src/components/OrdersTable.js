import { Box, Button, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styles from '../styles/Style.module.css';
import moment from 'moment';



export default function OrdersTable({ orders }) {


    return (
        <TableContainer>
            <Table sx={{ width: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell className='id'>Order #</TableCell>
                        <TableCell className='date'>Order Date</TableCell>
                        <TableCell className='total'>Order Total</TableCell>
                        <TableCell className='delivered-status'>Delivery Status</TableCell>
                        <TableCell className='name'>Customer Name</TableCell>
                        <TableCell className='email'>Customer Email</TableCell>
                        <TableCell className='actions'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order._id}>
                            <TableCell>{(order._id).substring((order._id.length - 5), order._id.length)}</TableCell>
                            <TableCell>{moment(order.created_at).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                            <TableCell>$ {(order.orderTotal).toLocaleString()}</TableCell>
                            <TableCell>{(order.delivered).toString()}</TableCell>
                            <TableCell>{order.customer.name}</TableCell>
                            <TableCell>{order.customer.email}</TableCell>
                            <TableCell>
                                <IconButton>
                                    <MoreHorizIcon fontSize='medium' />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}