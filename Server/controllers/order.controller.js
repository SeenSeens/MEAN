const Order = require('../models/order.model');

// Thêm đơn hàng
const newOrder = async ( req, res ) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).send(newOrder);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

// Cập nhật trạng thái đơn hàng
const updateOrder = async ( req, res ) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            return res.status(404).send({ error: 'Order not found' });
        }
        res.send(order);
    } catch (e) {

    }
}

module.exports = {
    newOrder,
    updateOrder
}