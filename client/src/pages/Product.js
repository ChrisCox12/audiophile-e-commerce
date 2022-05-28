import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import cld from '../utils/cld';
import CategoryCards from '../components/CategoryCards';
import AboutUs from '../components/AboutUs';
import { useGetProductQuery } from '../redux/productApi';
import styles from '../styles/Style.module.css';




export default function ProductPage() {
    const { slug } = useParams();
    const { data, isFetching } = useGetProductQuery(slug);
    const [quantity, setQuantity] = useState(1);
    console.log(data)

    function updateQuantity(option) {
        if(option === 'increment') {
            if(quantity === 10) return; 

            setQuantity(quantity + 1);
        }
        else {
            if(quantity === 1) return;

            setQuantity(quantity - 1);
        }
    }

    function addToCart() {

    }

    if(isFetching) return <Typography>Loading...</Typography>;

    return (
        <div className={styles['page-container']}>
            <Box className='product-page' padding={{ xs: '1rem 1.5rem 7.5rem', md: '2rem 2.5rem 7.5rem', xl: '5rem 0 10rem' }} maxWidth='70rem'>
                <Link to='/'>Go Back</Link>

                <Box 
                    className='product-upper' 
                    display='flex' 
                    flexDirection={{ xs: 'column', md: 'row' }} 
                    gap={{ xs: '2rem', md: '4rem', xl: '7.5rem' }} 
                    marginBottom={{ xs: '5.5rem', md: '7.5rem', xl: '10rem' }}
                >
                    <Box className={styles['product-image']}>
                        <AdvancedImage cldImg={cld.image(data.product.image)} />
                    </Box>

                    <Box>
                        {data.product.new && <Typography color='orange.primary' letterSpacing='10px'>NEW PRODUCT</Typography>}
                        
                        <Typography component='h1' variant='h3' fontWeight={700} textTransform='uppercase' marginBottom={{ xs: '1.5rem', md: '2rem' }}>{data.product.name}</Typography>
                        <Typography marginBottom={{ xs: '1.5rem', md: '2rem' }}>{data.product.description}</Typography>

                        <div>
                            <Typography marginBottom={{ xs: '2rem', xl: '2.5rem' }}>$ {data.product.price}</Typography>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ backgroundColor: '#F1F1F1', fontWeight: 700 }}>
                                    <Button className={styles['quantity-button']} onClick={() => updateQuantity('decrement')}>-</Button>
                                    {quantity}
                                    <Button className={styles['quantity-button']} onClick={() => updateQuantity('increment')}>+</Button>
                                </div>

                                <Button className={styles['add-to-cart-button']} onClick={() => addToCart()}>ADD TO CART</Button>
                            </div>
                        </div>
                    </Box>
                </Box>

                <Box 
                    className='product-lower' 
                    display='flex' 
                    flexDirection={{ xs: 'column', xl: 'row' }} 
                    gap={{ xs: '5.5rem', md: '7.5rem' }} 
                    marginBottom={{ xs: '5.5rem', md: '7.5rem', xl: '10rem' }}
                >
                    <Box width={{ xl: '65%' }}>
                        <Typography component='h2' variant='h5' fontWeight={700} marginBottom={{ xs: '1.5rem', md: '2rem' }}>FEATURES</Typography>
                        <Typography>{data.product.features}</Typography>
                    </Box>

                    <Box width={{ xl: '35%' }} display='flex' flexDirection={{ xs: 'column', md: 'row', xl: 'column'}}>
                        <Typography component='h2' variant='h5' fontWeight={700} marginBottom={{ xs: '1.5rem', md: '0', xl: '2rem' }} width={{ xs: '100%', md: '50%', xl: '100%' }}>IN THE BOX</Typography>

                        <div>{data.product.includes.map((included, index) => (
                            <Typography key={index}>
                                <span style={{ color: '#D87D4A', fontWeight: 700, marginRight: '1.5rem' }}>{included.quantity}x</span>
                                {included.item}
                            </Typography>
                        ))}</div>
                    </Box>
                </Box>

                <div className={styles['product-gallery']}>
                    <AdvancedImage className={styles['gallery-image']} cldImg={cld.image(data.product.gallery.first)} />
                    <AdvancedImage className={styles['gallery-image']} cldImg={cld.image(data.product.gallery.second)} />
                    <AdvancedImage className={styles['gallery-image']} cldImg={cld.image(data.product.gallery.third)} />
                </div>

                <Box className='product-suggestions'></Box>

                <CategoryCards />

                <AboutUs />
            </Box>
        </div>
    )
}