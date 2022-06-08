import { Modal, Slide, Box, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../../styles/Style.module.css';




export default function AdminMenu({ showMenu }) {

    return (
        <Modal open={showMenu} sx={{ zIndex: 99 }}>
            <Slide direction='right' in={showMenu} mountOnEnter unmountOnExit>
                <Box width='4rem' height='4rem' bgcolor='red' position='absolute' left={0} top='5.5rem'>
                    <Typography>blah</Typography>
                </Box>
            </Slide>
        </Modal>
    )
}