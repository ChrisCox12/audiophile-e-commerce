//import logo from './logo.svg';
//import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import HomePage from "./pages/Home";
import CheckoutPage from "./pages/Checkout";
import ProductPage from "./pages/Product";
import AdminDashboardPage from './pages/admin/AdminDashboard';
import AdminLoginPage from './pages/admin/AdminLogin';
import CategoryPage from './pages/Category';
import theme from './styles/theme';
import Layout from './components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from './redux/cartSlice';
import AdminLayout from './components/admin/AdminLayout';
import NewProductPage from './pages/admin/NewProduct';
import OrdersPage from './pages/admin/Orders';
import ProductsPage from './pages/admin/Products';


function App() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        if(localStorage.getItem('cart')) dispatch( setCart( JSON.parse( localStorage.getItem('cart') ) ) );
    }, []);

    useEffect(() => {
        if(cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        else {
            localStorage.removeItem('cart');
        }
    }, [cart]);
    

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path='home' element={<HomePage />} />
                        <Route path='category/:category' element={<CategoryPage />} />
                        <Route path='product/:slug' element={<ProductPage />} />
                        <Route path='checkout' element={<CheckoutPage />} />
                    </Route>

                    <Route path='/admin'>
                        <Route element={<AdminLayout />}>
                            <Route index element={<AdminDashboardPage />} />
                            <Route path='create-product' element={<NewProductPage />} />
                            <Route path='orders' element={<OrdersPage />} />
                            <Route path='products' element={<ProductsPage />} />
                        </Route>
                        
                        <Route path='login' element={<AdminLoginPage />} />
                    </Route>
                    {/* <Route path='/admin' element={<AdminDashboardPage />} />
                    <Route path='/login' element={<AdminLoginPage />} /> */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
