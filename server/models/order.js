import mongoose from 'mongoose';


const orderSchema = mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now()
    },
    customer: {
        name: String,
        email: String,
        phone: String,
        address: String,
        city: String,
        country: String,
        zip: String
    },
    cart: [{
        name: String,
        slug: String,
        price: Number,
        quantity: Number
    }],
    orderTotal: { 
        type: Number, 
        default: 0.00 
    },
    payment: {
        method: String,
        cardNumber: String,
        cvc: String,
        expirationDate: String 
    },
    delivered: {
        type: String,
        default: 'Pending'
    }
});


const Order = mongoose.model('Order', orderSchema);

export default Order;