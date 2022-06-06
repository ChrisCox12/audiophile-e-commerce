import Order from "../models/order.js";


export async function getAllOrders(req, res) {
    try {
        const orders = await Order.find();

        if(!orders) return res.json({ success: false, msg: 'Could not find any products' });

        res.json({ success: true, msg: 'Successfully retrieved orders', orders: orders });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to retrieved orders' });    
    }
}

export async function createOrder(req, res) {
    try {
        const order = new Order(req.body);

        await order.save();

        console.log(`Creating order: \n ${order}`);
        res.json({ success: true, msg: 'Successfully created order' });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to create order' });
    }
}

export async function editOrder(req, res) {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);

        if(!order) return res.json({ success: false, msg: 'Could not find order' });

        await Order.findByIdAndUpdate(id, req.body);

        res.json({ success: true, msg: 'Successfully updated order' });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to create order' });
    }
}

