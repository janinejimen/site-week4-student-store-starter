const prisma = require("../models/prisma-client");

exports.getAllOrderItems = async(req, res) => {
    let order_items = await prisma.orderItem.findMany()
    res.json(order_items)
}

exports.createOrderItems = async(req, res) => {
    const {order_id, product_id, price, quantity} = req.body
    const newOrderItem = await prisma.orderItem.create({
        data: {
            order_id,
            product_id,
            price,
            quantity
        }
    })

    res.status(201).json(newOrderItem)
}