//import logo from './logo.svg';
//import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import HomePage from "./pages/Home";
import CheckoutPage from "./pages/Checkout";
import EarphonesPage from "./pages/Earphones";
import HeadphonesPage from "./pages/Headphones";
import ProductPage from "./pages/Product";
import SpeakersPage from "./pages/Speakers";
import AdminDashboardPage from './pages/AdminDashboard';
import AdminLoginPage from './pages/AdminLogin';
import theme from './styles/theme';
import Layout from './components/Layout';


function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path='home' element={<HomePage />} />
                        <Route path='earphones' element={<EarphonesPage />} />
                        <Route path='headphones' element={<HeadphonesPage />} />
                        <Route path='speakers' element={<SpeakersPage />} />
                        <Route path='product/:slug' element={<ProductPage />} />
                        <Route path='checkout' element={<CheckoutPage />} />
                    </Route>

                    <Route path='/admin' element={<AdminDashboardPage />} />
                    <Route path='/login' element={<AdminLoginPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
