const prisma = require("../models/prisma-client");

exports.getAll = async (req, res) => {
    const products = await prisma.product.findMany()
    res.json(products)

    
}

exports.getById = async (req, res) => {
    const id = Number(req.params.id)
    const product = await prisma.product.findUnique({where: {id}})
    if(!product) {
        return res.status(404).json({error:"Not Found"})
    }

    res.json(product)
}

exports.create = async (req, res) => {
    const {name, description, price, image_url, category} = req.body
    const newProduct = await prisma.product.create({
        data: {
            name,
            description,
            price,
            image_url,
            category
        }
    })
    res.status(201).json(newProduct)
}

exports.update = async (req, res) => {
    const id = Number(req.params.id)
    const {name, description, price, image_url, category} = req.body
    const updatedProduct = await prisma.product.update ({
        where: {id},
        data: {name, description, price, image_url, category}
    })

    res.json(updatedProduct)
}

exports.remove = async (req, res) => {
    const id = Number(req.params.id)
    await prisma.product.delete({where: {id}})
    res.status(204).end()
}