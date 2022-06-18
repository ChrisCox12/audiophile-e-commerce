import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Typography } from '@mui/material';
import { useGetAllProductsQuery } from '../../redux/productApi';
import styles from '../../styles/Style.module.css';


export default function ProductsPage() {
    const { data: products, isFetching } = useGetAllProductsQuery();
    const navigate = useNavigate();

    
    useEffect(() => {
        if( !localStorage.getItem('audiophile_admin_token') ) navigate('/admin/login');
    }, []);


    if(isFetching) return <Typography>Loading...</Typography>;

    return (
        <Box width='100%' overflow='scroll' height='100vh' padding={{ xs: '1.5rem', md: '2rem'}} bgcolor='#F1F1F1'>
            <Typography className={styles['page-header']} component='h1' variant='h4'>Products</Typography>

            <TableContainer>
                <Table className={styles['product-table']}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Slug</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>New</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.products.map(product => (
                            <TableRow key={product.slug}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.slug}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize' }}>{product.category}</TableCell>
                                <TableCell>{product.new ? 'Yes' : 'No'}</TableCell>
                                <TableCell>$ {(product.price).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button variant='outlined' onClick={() => navigate(`/admin/product/${product.slug}`)}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}