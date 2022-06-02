import { useState } from "react";
import { AppBar, Grid, IconButton, Toolbar, Stack, Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import Cart from "./Cart";
import MobileMenu from "./MobileMenu";

import logo from '../assets/audiophile 2.svg';
import styles from '../styles/Style.module.css';
import { useSelector } from "react-redux";


export default function Navbar() {
    const [showCart, setShowCart] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const cart = useSelector(state => state.cart);

    function closeCart() {
        setShowCart(false);
    }

    function closeMenu() {
        setShowMobileMenu(false);
    }

    


    return (
        <AppBar className='navbar' position='static' sx={{ height: { xs: '5.5rem', lg: '6rem' } }}>
            <Toolbar 
                sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: { xs: 'space-between', sm: 'auto', md: 'space-between' }, 
                    bgcolor: 'black', 
                    zIndex: 100 
                }}
            >
                <IconButton sx={{ display: { md: 'none' }, marginRight: { sm: '2rem' } }} onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    <MenuIcon sx={{ color: 'white' }} />
                </IconButton>

                <Link to='/'>
                    <img src={logo} alt='logo' />
                </Link>

                <Stack className={styles.navlinks} spacing={2} direction='row' display={{ xs: 'none', md: 'flex' }}>
                    <Link to='/'>HOME</Link>
                    <Link to='/category/headphones'>HEADPHONES</Link>
                    <Link to='/category/speakers'>SPEAKERS</Link>
                    <Link to='/category/earphones'>EARPHONES</Link>
                </Stack>

                <IconButton sx={{ marginLeft: { sm: 'auto', md: '0' } }} onClick={() => setShowCart(!showCart)}>
                    <Badge badgeContent={cart.length} color='primary'>
                        <ShoppingCartOutlinedIcon sx={{ color: 'white' }} />
                    </Badge>
                </IconButton>

                <MobileMenu showMenu={showMobileMenu} closeMenu={closeMenu} />

                <Cart showCart={showCart} closeCart={closeCart} />
            </Toolbar>
        </AppBar>
    )
}