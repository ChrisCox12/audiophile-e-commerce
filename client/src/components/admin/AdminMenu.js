import { Modal, Slide } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from '../../styles/Style.module.css';


export default function AdminMenu({ showMenu, closeMenu }) {
    const location = useLocation();

    return (
        <Modal className='nav-modal' open={showMenu} onClose={closeMenu} sx={{ zIndex: 99, display: { md: 'none' } }}>
            <Slide direction='right' in={showMenu} mountOnEnter unmountOnExit>
                <div className={styles['sidebar-menu-container']}>
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
                    <Button className={styles['admin-navlinks']}>Logout</Button>
                </div>
            </Slide>
        </Modal>
    )
}