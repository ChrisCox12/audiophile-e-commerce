import Order from "../models/order.js";
import moment from 'moment';


export async function getAllOrders(req, res) {
    try {
        const orders = await Order.find();

        if(!orders) return res.json({ success: false, msg: 'Could not find any orders' });

        res.json({ success: true, msg: 'Successfully retrieved orders', orders: orders });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to retrieved orders' });    
    }
}

export async function getTotalSales(req, res) {
    try {
        const orders = await Order.find();

        if(!orders) return res.json({ success: false, msg: 'Could not find any orders' });

        let sales = 0;
        
        orders.map(order => { sales += order.orderTotal });

        res.json({ success: true, msg: 'Successfully retrieved sales', totalSales: sales  });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to retrieved sales' });    
    }
}

export async function getTotalOrders(req, res) {
    try {
        const orders = await Order.find();

        if(!orders) return res.json({ success: false, msg: 'Could not find any orders' });

        res.json({ success: true, msg: 'Successfully retrieved orders', totalOrders: orders.length });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to retrieved orders' });    
    }
}

export async function getLatestOrders(req, res) {
    try {
        const orders = await Order.find().sort({ created_at: -1 }).limit(10);

        if(!orders) return res.json({ success: false, msg: 'Could not find any orders' });

        res.json({ success: true, msg: 'Successfully retrieved orders', orders: orders });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to retrieved orders' });    
    }
}

export async function getPastYearOrders(req, res) {
    try {
        const currentMonth = moment(Date.now()).format('M');
        const currentYear = moment(Date.now()).format('YYYY');
        const pastYear = currentYear - 1;
        const pastMonth = Number(currentMonth) + 1;
        //console.log(new Date(`${pastYear}-${pastMonth}-01`))

        //  .find( {FILTER}, {PROJECTION} )
        const orders = await Order.find(
            { 
                created_at: { 
                    $gte: new Date(`${pastYear}-${pastMonth}-01`), 
                    $lt: Date.now() 
                } 
            }, 
            { created_at: 1, orderTotal: 1, _id: 0 }
        ).sort({ created_at: -1 });

        if(!orders) return res.json({ success: false, msg: 'Could not find any orders' });

        res.json({ success: true, msg: 'Successfully retrieved orders', pastYearOrders: orders });
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

