import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = 'http://localhost:8000';

const createRequest = (url) => ({ url });


export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => createRequest('/orders')
        }),
        getTotalSales: builder.query({
            query: () => createRequest('/orders/totalSales')
        }),
        getTotalOrders: builder.query({
            query: () => createRequest('/orders/totalOrders')
        })
    })
});


export const { useGetOrdersQuery, useGetTotalSalesQuery, useGetTotalOrdersQuery } = orderApi;