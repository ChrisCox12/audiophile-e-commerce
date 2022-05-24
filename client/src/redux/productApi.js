import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = 'http://localhost:8000';


const createRequest = (url) => ({ url });


export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getProductsByCategory: builder.query({
            query: (category) => createRequest(`/category/${category}`)
        }),
        getProduct: builder.query({
            query: (slug) => createRequest(`/product/${slug}`)
        })
    })
});



export const { useGetProductsByCategoryQuery, useGetProductQuery } = productApi;