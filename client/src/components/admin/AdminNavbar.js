import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AdminMenu from './AdminMenu';
import logo from '../../assets/audiophile 2.svg';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from '../../styles/Style.module.css';


export default function AdminNavbar() {
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    function handleCloseMobileMenu() {
        setShowMenu(false);
    }

    function handleLogOut(e) {
        e.preventDefault();

        localStorage.removeItem('audiophile_admin_token');

        navigate('/admin/login');
    }


    return (
        <AppBar 
            className='admin-navbar' 
            position='static' 
            sx={{ 
                minHeight: '5.5rem', 
                height: { md: '100vh' }, 
                width: { md: '20rem' }, 
                flexShrink: 'unset', 
                borderRight: { md: '2px solid #D87D4A' } 
            }}
        >
            <Toolbar
                sx={{
                    height: '100%',
                    display: 'flex',
                    padding: { md: '0' },
                    flexDirection: { md: 'column' },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    bgcolor: 'black',
                    zIndex: 100
                }}
            >
                <Box 
                    display='flex' 
                    flexDirection='row' 
                    alignItems='center' 
                    justifyContent='space-between' 
                    padding={{ md: '1.5rem 1.5rem 2rem' }} 
                    width={{ md: '100%' }} 
                    gap='1rem'
                >
                    <IconButton sx={{ display: { md: 'none' }, color: 'white' }} onClick={() => setShowMenu(!showMenu)}>
                        <MenuIcon />
                    </IconButton>
                    
                    
                    <img src={logo} alt='Audiophile logo' />
                </Box>

                <AdminMenu showMenu={showMenu} closeMenu={handleCloseMobileMenu} logout={handleLogOut} />

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
                    <Button className={styles['admin-navlinks']} onClick={handleLogOut}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}