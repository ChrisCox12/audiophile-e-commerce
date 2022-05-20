import { useState } from "react";
import { AppBar, Grid, IconButton, Toolbar } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import Cart from "./Cart";
import MobileMenu from "./MobileMenu";

import logo from '../assets/audiophile 2.svg';


export default function Navbar() {
    const [showCart, setShowCart] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    function closeCart() {
        setShowCart(false);
    }

    function closeMenu() {
        setShowMobileMenu(false);
    }

    


    return (
        <AppBar className='navbar' position='static' sx={{ height: { xs: '5.5rem', lg: '6rem' } }}>
            <Toolbar sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: { xs: 'space-between', sm: 'auto', md: 'space-between' }, bgcolor: 'black', zIndex: 100 }}>
                <IconButton sx={{ display: { md: 'none' }, marginRight: { sm: '2rem' } }} onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    <MenuIcon sx={{ color: 'white' }} />
                </IconButton>

                <Link to='/'>
                    <img src={logo} alt='logo' />
                </Link>

                <Grid container display={{ xs: 'none', md: 'flex' }} width='fit-content' spacing={2}>
                    <Grid item>
                        <Link to='/'>HOME</Link>
                    </Grid>
                    <Grid item>
                        <Link to='/headphones'>HEADPHONES</Link>
                    </Grid>
                    <Grid item>
                        <Link to='/speakers'>SPEAKERS</Link>
                    </Grid>
                    <Grid item>
                        <Link to='earphones'>EARPHONES</Link>
                    </Grid>
                </Grid>

                <IconButton sx={{ marginLeft: { sm: 'auto', md: '0' } }} onClick={() => setShowCart(!showCart)}>
                    <ShoppingCartOutlinedIcon sx={{ color: 'white' }} />
                </IconButton>

                <MobileMenu showMenu={showMobileMenu} closeMenu={closeMenu} />

                <Cart showCart={showCart} closeCart={closeCart} />
            </Toolbar>
        </AppBar>
    )
}