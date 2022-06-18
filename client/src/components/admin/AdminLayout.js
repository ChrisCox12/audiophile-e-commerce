import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import styles from '../../styles/Style.module.css';


export default function AdminLayout() {
    return (
        <Box className={styles.layout} flexDirection={{ xs: 'column', md: 'row' }}>
            <AdminNavbar />
            <Outlet />
        </Box>
    )
}