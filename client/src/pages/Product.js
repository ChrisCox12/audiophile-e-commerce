import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useGetProductQuery } from '../redux/productApi';


export default function ProductPage() {
    const { slug } = useParams();
    const { data, isFetching } = useGetProductQuery(slug);
    //console.log(data)


    if(isFetching) return <Typography>Loading...</Typography>;

    return (
        <div>
            Product Page
            
        </div>
    )
}