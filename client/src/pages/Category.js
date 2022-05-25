import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';
import cld from '../utils/cld';
import { useGetProductsByCategoryQuery } from '../redux/productApi';
import AboutUs from '../components/AboutUs';
import styles from '../styles/Style.module.css';



export default function CategoryPage() {
    const { category } = useParams();
    const { data, isFetching } = useGetProductsByCategoryQuery(category);
    
    console.log(data)

    if(isFetching) return <Typography>Loading...</Typography>;

    return (
        <div>
            Category page
            <Box className='category-page'>
                <Typography className='category-page-category' fontWeight={700} color='white' padding={{ xs: '2rem 0', md: '6rem 0' }} textAlign='center'>{category}</Typography>

                <Box className='category-page-content' padding={{ xs: '4rem 1.5rem', md: '7.5rem 2.5rem', xl: '10rem' }}>
                    {data?.products?.map((product, index) => (
                        <Box className='product' display='flex' flexDirection={{ xs: 'column', xl: (index % 2 > 0) ? 'row-reverse' : 'row' }} data-reverse={index % 2 > 0 ? true : false} key={product.slug}>
                            <Box className='product-image' display='flex' justifyContent='center' alignItems='center' bgcolor='#F1F1F1'>
                                <AdvancedImage cldImg={cld.image(product.image)} />
                            </Box>

                            <Box className='product-info'></Box>
                        </Box>
                    ))}

                    <AboutUs />
                </Box>
            </Box>
        </div>
    )
}