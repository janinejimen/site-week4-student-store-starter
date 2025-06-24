const prisma = require("../models/prisma-client")

exports.getAllOrders = async (req, res) => {

    let orders = await prisma.order.findMany()
    res.json(orders)
}

exports.getOrderById = async (req, res) => {
    const id = Number(req.params.id)
    const order = await prisma.order.findUnique({where: {id}})

    if(!product) {
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
    const id = Number(req.params.id)
    const {customer_id, total_price, status, created_at} = req.body
    const updatedOrder = await prisma.order.update ({
        where: {id},
        data: {customer_id, total_price, status, created_at}
    })

    res.json(updatedProduct)
}

exports.removeOrder = async (req, res) => {
    const id = Number(req.params.id)
    await prisma.order.delete({where: {id}})
    res.status(204).end()
}
