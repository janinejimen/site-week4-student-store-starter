const prisma = require("../models/prisma-client")

exports.getAllOrders = async (req, res) => {

    let orders = await prisma.order.findMany({include: {orderItems: true}})
    res.json(orders)
}

exports.getOrderById = async (req, res) => {
    const order_id = Number(req.params.order_id)
    const order = await prisma.order.findUnique({where: {order_id}, include: { orderItems: true }})

    if(!order) {
        return res.status(404).json({error:"Not Found"})
    }

    res.json(order)
}

exports.createOrder = async (req, res) => {
    const {customer_id, total_price, status, created_at} = req.body
    const newOrder = await prisma.order.create ({
        data: {
            customer_id,
            total_price,
            status, 
            created_at
        }
    })

    res.status(201).json(newOrder)
}

exports.updateOrder = async (req, res) => {
    const order_id = Number(req.params.order_id)
    const {customer_id, total_price, status, created_at} = req.body
    const updatedOrder = await prisma.order.update ({
        where: {order_id},
        data: {customer_id, total_price, status, created_at}
    })

    res.json(updatedOrder)
}

exports.removeOrder = async (req, res) => {
    const id = Number(req.params.order_id)
    await prisma.order.delete({where: { order_id: id } })
    res.status(204).end()
}

exports.addOrderItems = async (req, res) => {
    const idParam = Number(req.params.order_id)

    const {product_id} = req.body

    const newOrderItem = await prisma.orderItem.create ({
        data: {
            order_id: {connect: {order_id: idParam}}, 
            product_id: {connect: {id: product_id}}, 
            quantity,
            price
        }
    })

    res.status(201).json(newOrderItem)
}

exports.getTotal = async(req, res) => {
    
}
