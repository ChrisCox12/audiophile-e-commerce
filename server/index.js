import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import productRoutes from './routes/products.js';

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/products', productRoutes);


mongoose
    .connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port: ${PORT}`);
        })
    })
    .catch(err => console.log(err));