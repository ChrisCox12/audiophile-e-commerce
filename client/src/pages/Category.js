import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';
import cld from '../utils/cld';
import { useGetProductsByCategoryQuery } from '../redux/productApi';
import AboutUs from '../components/AboutUs';
import CategoryCards from '../components/CategoryCards';
import styles from '../styles/Style.module.css';



export default function CategoryPage() {
    const { category } = useParams();
    const { data, isFetching } = useGetProductsByCategoryQuery(category);
    
    console.log(data)

    if(isFetching) return <Typography>Loading...</Typography>;

    return (
        <div className={styles['page-container']}>
            <Typography className={styles['category-page-category']} component='h1' variant='h3' padding={{ xs: '2rem 0', md: '6rem 0' }} width='100%'>{category}</Typography>
            <Box className='category-page' maxWidth='70rem'>
                

                <Box className='category-page-content' padding={{ xs: '4rem 1.5rem', md: '7.5rem 2.5rem', xl: '10rem 0' }}>
                    {data?.products?.map((product, index) => (
                        <Box 
                            className='product' 
                            display='flex' 
                            flexDirection={{ xs: 'column', xl: (index % 2 > 0) ? 'row-reverse' : 'row' }} 
                            alignItems={{ xl: 'center' }} 
                            gap={{ xl: '7.5rem' }} 
                            marginBottom={{ xs: '7.5rem', xl: '10rem' }} 
                            key={product.slug}
                        >
                            <Box 
                                className={styles['product-image']} 
                                marginBottom={{ xs: '2rem', md: '3.5rem', xl: '0' }} 
                                /* padding={{ xs: '1rem 0', md: '1.5rem 0', xl: '2rem 3rem' }} */
                                minWidth={{ xl: '34rem' }}
                                minHeight={{ xs: '22rem', xl: '35rem' }}
                            >
                                <AdvancedImage className='product-image' cldImg={cld.image(product.image)} />
                            </Box>

                            <Box className={styles['product-info']} textAlign={{ xs: 'center', xl: 'left' }}>
                                {product.new && <Typography className={styles['new-product']} marginBottom={{ xs: '1.5rem', md: '1rem' }}>NEW PRODUCT</Typography>}
                                
                                <Typography className={styles['product-name']} component='h2' variant='h4' marginBottom={{ xs: '1.5rem', md: '2rem' }}>{product.name}</Typography>
                                <Typography className={styles['product-description']} marginBottom={{ xs: '1.5rem', xl: '2.5rem' }}>{product.description}</Typography>

                                <Link to={`/product/${product.slug}`}>SEE PRODUCT</Link>
                            </Box>
                        </Box>
                    ))}

                    <CategoryCards />

                    <AboutUs />
                </Box>
            </Box>
        </div>
    )
}