const { Order } = require("../db/models");
const {OrderItem} = require("../db/models");

exports.checkout = async (req, res, next) =>{
    const newOrder = await Order.create({ userId: req.user.id});
    const cart = req.body.map((item) => ({ ...item, orderId: newOrder.id}));
    const newOrderItems = await OrderItem.bulkCreate(cart);

    res.status(201).json(newOrderItems);

};