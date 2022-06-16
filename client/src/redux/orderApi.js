import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


//const baseUrl = 'http://localhost:8000';
const baseUrl = process.env.REACT_APP_API_URL;
//let headers = {};

//if( localStorage.getItem('audiophile_admin_token') ) headers = { authorization: `Bearer ${localStorage.getItem('audiophile_admin_token')}` };


//const createRequest = (url) => ({ url, headers });
const createRequest = (url) => ({ url });

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            if( localStorage.getItem('audiophile_admin_token') ) {
                headers.set('authorization', `Bearer ${localStorage.getItem('audiophile_admin_token')}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => createRequest('/orders')
        }),
        getOrderById: builder.query({
            query: (id) => createRequest(`/orders/id/${id}`)
        }),
        getTotalSales: builder.query({
            query: () => createRequest('/orders/totalSales')
        }),
        getTotalOrders: builder.query({
            query: () => createRequest('/orders/totalOrders')
        }),
        getPastYearOrders: builder.query({
            query: () => createRequest('/orders/pastYear')
        }),
        getLatestOrders: builder.query({
            query: () => createRequest('/orders/latestOrders')
        })
    })
});


export const { 
    useGetOrdersQuery, 
    useGetOrderByIdQuery,
    useGetTotalSalesQuery, 
    useGetTotalOrdersQuery, 
    useGetPastYearOrdersQuery,
    useGetLatestOrdersQuery 
} = orderApi;