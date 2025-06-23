//here is where the router methods are implemented, but this way of implementation is easier in the long term when implementing other features

const prisma = require("../models/prisma-client");

//not only gets all of the products available, this method also filters out products
//if the filter is applicable
exports.getAll = async (req, res) => {
    //query because params is for route parameters and query is for query parameters
    const {category, price, name} = req.query
    let products = await prisma.product.findMany()

    if(category) {
        products = products.filter((p) => 
            p.category.toLowerCase().includes(category.toLowerCase())
        )

    }

     if(price) {
        const parsedPrice = parseFloat(price)

        if(!isNaN(parsedPrice)) {
            products = products.filter((p)=> p.price === parsedPrice)
        }
    }


    if(name) {
        products = products.filter((p) => {
            //why does this return thing fix the code?
            return p.name.toLowerCase().includes(name.toLowerCase())
        })
    }
    
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