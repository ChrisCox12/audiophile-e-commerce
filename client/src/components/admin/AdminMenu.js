import { Modal, Slide, Box, Typography, Stack } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../styles/Style.module.css';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddBoxIcon from '@mui/icons-material/AddBox';



export default function AdminMenu({ showMenu, closeMenu }) {
    const location = useLocation();

    return (
        <Modal className='nav-modal' open={showMenu} onClose={closeMenu} sx={{ zIndex: 99, display: { md: 'none' } }}>
            <Slide direction='right' in={showMenu} mountOnEnter unmountOnExit>
                <Box display='flex' flexDirection='column' width='50%' minWidth='14rem' height='100vh' bgcolor='black' position='absolute' left='0' top='5.5rem' borderTop='2px solid #D87D4A' borderRight='2px solid #D87D4A'>
                    <Link to='/admin' className={styles['admin-navlinks']} data-selected={location.pathname === '/admin'} onClick={closeMenu}>
                        <HomeRoundedIcon fontSize='large' />
                        <span>Dashboard</span>
                    </Link>
                    <Link to='/admin/products' className={styles['admin-navlinks']} data-selected={location.pathname === '/admin/products'} onClick={closeMenu}>
                        <InventoryIcon fontSize='large' />
                        <span>Products</span>
                    </Link>
                    <Link to='/admin/create-product' className={styles['admin-navlinks']} data-selected={location.pathname === '/admin/create-product'} onClick={closeMenu}>
                        <AddBoxIcon fontSize='large' />
                        <span>Add Product</span>
                    </Link>
                    <Link to='/admin/orders' className={styles['admin-navlinks']} data-selected={location.pathname === '/admin/orders'} onClick={closeMenu}>
                        <ShoppingBagIcon fontSize='large' />
                        <span>Orders</span>
                    </Link>
                </Box>
            </Slide>
        </Modal>
    )
}