import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = 'http://localhost:8000';


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
        })
    })
});



export const { useGetProductsByCategoryQuery, useGetProductQuery, useGetTotalProductsQuery } = productApi;