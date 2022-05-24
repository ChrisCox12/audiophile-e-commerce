import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";


export default function Layout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
