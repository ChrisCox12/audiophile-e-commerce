import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = process.env.REACT_APP_API_URL;
const createRequest = (url) => ({ url });


export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getProductsByCategory: builder.query({
            query: (category) => createRequest(`/products/category/${category}`)
        }),
        getProduct: builder.query({
            query: (slug) => createRequest(`/products/product/${slug}`)
        }),
        getTotalProducts: builder.query({
            query: () => createRequest('/products/total')
        }),
        getAllProducts: builder.query({
            query: () => createRequest('/products')
        })
    })
});


export const { 
    useGetProductsByCategoryQuery, 
    useGetProductQuery, 
    useGetTotalProductsQuery, 
    useGetAllProductsQuery 
} = productApi;