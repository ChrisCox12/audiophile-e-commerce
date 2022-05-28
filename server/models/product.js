import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    slug: String,
    name: String,
    image: String,
    category: String,
    new: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0.00
    },
    description: String,
    features: String,
    includes: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            item: String
        }
    ],
    gallery: {
        first: String,
        second: String,
        third: String
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;