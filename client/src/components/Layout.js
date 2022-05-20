import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";


export default function Layout() {
    return (
        <Box>
            <Navbar />
            <Outlet />
            <Footer />
        </Box>
    )
}
