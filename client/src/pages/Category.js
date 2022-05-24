import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useGetProductsByCategoryQuery } from '../redux/productApi';


export default function CategoryPage() {
    const { category } = useParams();
    //const { data: products, isFetching } = useGetProductsByCategoryQuery(category);
    

    //if(isFetching) return <Typography>Loading...</Typography>;

    return (
        <div>Category page</div>
    )
}