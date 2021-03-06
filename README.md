# Frontend Mentor - Audiophile e-commerce website solution

This is a solution to the [Audiophile e-commerce website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 


## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)


## Overview

### The challenge

- Users should be able to:
    - View the optimal layout for the app depending on their device's screen size
    - See hover states for all interactive elements on the page
    - Add/Remove products from the cart
    - Edit product quantities in the cart
    - Fill in all fields in the checkout
    - Receive form validations if fields are missed or incorrect during checkout
    - See correct checkout totals depending on the products in the cart
    - Shipping always adds $50 to the order
    - See an order confirmation modal after checking out with an order summary

- Admin users should be able to:
    - Log in
        - admin login page is at /admin/login
    - View a dashboard displaying a recent history of profits and orders
    - Add/Remove/Update products
        - Does not currently allow you to update a product's images
    - View a list of all products
    - View a list of all orders
    - View details of an order
    - Update the delivery status of an order


### Screenshots

- Home Page
    - Desktop
    ![Home Page - desktop](./screenshots/Home-desktop-1.jpeg)
    - Mobile
    ![Home Page - mobile](./screenshots/Home-mobile.jpeg)
- Category Page
    - Desktop
    ![Category Page - desktop](./screenshots/Category-desktop.jpeg)
    - Mobile
    ![Category Page - mobile](./screenshots/Category-mobile.jpeg)
- Product Page
    - Desktop
    ![Product Page - desktop](./screenshots/Product-desktop.jpeg)
    - Mobile
    ![Product Page - mobile](./screenshots/Product-mobile.jpeg)
- Checkout Page
    - Desktop
    ![Checkout Page - desktop](./screenshots/Checkout-desktop.jpeg)
    - Mobile
    ![Checkout Page - mobile](./screenshots/Checkout-mobile.jpeg)
- Order Confirmation Modal
![Order Confirmation Modal](./screenshots/Order-confirmation-desktop.jpeg)
- Admin 
    - Dashboard
        - Desktop
            - 1/2
            ![Admin Dashboard - desktop 1/2](./screenshots/Admin-dashboard-1.jpeg)
            - 2/2
            ![Admin Dashboard - desktop 2/2](./screenshots/Admin-dashboard-2.jpeg)
        - Mobile
        ![Admin Dashboard - mobile](./screenshots/Admin-dashboard-mobile.jpeg)
    - Products
        - Product Details
            - Desktop
                - 1/3
                ![Product Details - desktop 1/3](./screenshots/Admin-product-details-desktop-1.jpeg)
                - 2/3
                ![Product Details - desktop 2/3](./screenshots/Admin-product-details-desktop-2.jpeg)
                - 3/3
                ![Product Details - desktop 3/3](./screenshots/Admin-product-details-desktop-3.jpeg)
            - Mobile
                - 1/3
                ![Product Details - mobile 1/3](./screenshots/Admin-product-details-mobile-1.jpeg)
                - 2/3
                ![Product Details - mobile 2/3](./screenshots/Admin-product-details-mobile-2.jpeg)
                - 3/3
                ![Product Details - mobile 3/3](./screenshots/Admin-product-details-mobile-3.jpeg)
        - Add Product
            - Desktop
                - 1/2
                ![New Product - desktop 1/2](./screenshots/Admin-new-product-desktop-1.jpeg)
                - 2/2
                ![New Product - desktop 2/2](./screenshots/Admin-new-product-desktop-2.jpeg)
            - Mobile
                - 1/2
                ![New Product - mobile 1/2](./screenshots/Admin-new-product-mobile-1.jpeg)
                - 2/2
                ![New Product - mobile 2/2](./screenshots/Admin-new-product-mobile-2.jpeg)
    - Orders
    ![Order Table](./screenshots/Admin-orders.jpeg)
    - Order Details
        - Desktop
        ![Order Details - desktop](./screenshots/Admin-order-details-desktop.jpeg)
        - Mobile
        ![Order Details - mobile](./screenshots/Admin-order-details-mobile.jpeg)



### Links

- Live Site URL: [Audiophile](https://audiophile-proj.netlify.app)


## My process

### Built with

- [React](https://reactjs.org/) - Front-end JS library
- [React-router-dom](https://reactrouter.com/) - Client-side routing library
- [Emotion](https://emotion.sh/docs/introduction) - A library for writing css styles with JS
- [Cloudinary](https://cloudinary.com/) - A cloud service for storing and delivering media assets
- [MUI](https://mui.com/) - Material UI styling library/framework for React
- [Chart.js](https://www.chartjs.org/) - A JS library for creating charts
- [Dotenv](https://www.dotenv.org/) - A module that safely and securely loads environment variables from a .env file into an application
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken#readme) - A library for implementing JSON Web Tokens
- [Node.js](https://nodejs.org/en/) - JS runtime
- [Express.js](https://expressjs.com/) - Web framework for Node.js
- [CORS](https://github.com/expressjs/cors#readme) - a Node.js package that provides a middleware to enable CORS
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - Object Data Modeling library for MongoDB
- [Nodemon](https://nodemon.io/) - A tool that monitors Node.js based applications and automatically restarts when file changes are detected
- [Moment.js](https://momentjs.com/) - A JS library for parsing and displaying dates and times
- [Millify](https://github.com/izolate/millify#readme) - A package for converts long numbers into human-radable string
- [Axios](https://axios-http.com/) - HTTP client library for the browser and Node.js
- [Redux Toolkit](https://redux-toolkit.js.org/) - A package that standardizes the Redux state management library
- Custom CSS properties


### What I learned

- How to use Cloudinary to store and deliver images


### Continued development

Goind forward, I would like to add the functionality to update images as an admin. I would, also, like to add a login and account feature for general users so that they can monitor their own order history.


## Author
- Website - [Christopher Cox](https://chriscox12.github.io/)
- Frontend Mentor - [@ChrisCox12](https://www.frontendmentor.io/profile/ChrisCox12)
