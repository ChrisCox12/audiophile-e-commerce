import { Box, Typography, AppBar, Toolbar, IconButton, Menu, MenuItem, Stack, Slide, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AdminMenu from './AdminMenu';
import styles from '../../styles/Style.module.css';
import logo from '../../assets/audiophile 2.svg';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddBoxIcon from '@mui/icons-material/AddBox';




export default function AdminNavbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const location = useLocation();


    function handleOpen(e) {
        setAnchorEl(e.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleCloseMobileMenu() {
        setShowMenu(false);
    }


    return (
        <AppBar className='admin-navbar' position='static' sx={{ height: { xs: '5.5rem', md: '100vh' }, width: { md: '20rem' }, flexShrink: 'unset', borderRight: { md: '2px solid #D87D4A' } }}>
            <Toolbar
                sx={{
                    height: '100%',
                    display: 'flex',
                    padding: { md: '0' },
                    flexDirection: { md: 'column' },
                    alignItems: {xs: 'center', md: 'flex-start'},
                    bgcolor: 'black',
                    zIndex: 100
                }}
            >
                <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between' padding={{ md: '1.5rem 1.5rem 2rem' }} width={{ md: '100%' }} gap='1rem'>
                    <IconButton sx={{ display: { md: 'none' }, color: 'white' }} onClick={() => setShowMenu(!showMenu)}>
                        <MenuIcon />
                    </IconButton>
                    
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <img src={logo} alt='' />
                        <Link to='/admin'>Admin Dashboard</Link>
                    </div>
                </Box>

                <AdminMenu showMenu={showMenu} closeMenu={handleCloseMobileMenu} />

                <Box display={{ xs:'none', md: 'flex' }} flexDirection='column' width='100%'>
                    <Link to='/admin' className={styles['admin-navlinks']} data-selected={location.pathname === '/admin'}>
                        <HomeRoundedIcon fontSize='large' />
                        <span>Dashboard</span>
                    </Link>
                    <Link to='/admin/products' className={styles['admin-navlinks']} data-selected={location.pathname === '/admin/products'}>
                        <InventoryIcon fontSize='large' />
                        <span>Products</span>
                    </Link>
                    <Link to='/admin/create-product' className={styles['admin-navlinks']} data-selected={location.pathname === '/admin/create-product'}>
                        <AddBoxIcon fontSize='large' />
                        <span>Add Product</span>
                    </Link>
                    <Link to='/admin/orders' className={styles['admin-navlinks']} data-selected={location.pathname === '/admin/orders'}>
                        <ShoppingBagIcon fontSize='large' />
                        <span>Orders</span>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    )
}