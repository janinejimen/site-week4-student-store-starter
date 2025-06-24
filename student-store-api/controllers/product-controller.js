//here is where the router methods are implemented, but this way of implementation is easier in the long term when implementing other features

const prisma = require("../models/prisma-client");

//not only gets all of the products available, this method also filters out products
//if the filter is applicable
exports.getAllProd = async (req, res) => {
    //query because params is for route parameters and query is for query parameters
    const {category, price, name} = req.query
    let products = await prisma.product.findMany()

    //here we are implementing all possible query parameters to filter data
    //need to incldue the curly braces and return statements
    if(category) {
        products = products.filter((p) => {
            return p.category.toLowerCase().includes(category.toLowerCase())
        })
    }

     if(price) {
        const parsedPrice = parseFloat(price)

        if(!isNaN(parsedPrice)) {
            products = products.filter((p)=> {
                return p.price === parsedPrice
            })
        }
    }

    if(name) {
        products = products.filter((p) => {
            return p.name.toLowerCase().includes(name.toLowerCase())
        })
    }
    
    res.json(products)
}

//grabs and returns specific products based on the id provided
exports.getByIdProd = async (req, res) => {
    const id = Number(req.params.id)
    const product = await prisma.product.findUnique({where: {id}})
    if(!product) {
        return res.status(404).json({error:"Not Found"})
    }

    res.json(product)
}

//creates a product item and adds it to the db of products
exports.createProd = async (req, res) => {
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

//updates specific items given an id
exports.updateProd = async (req, res) => {
    const id = Number(req.params.id)
    const {name, description, price, image_url, category} = req.body
    const updatedProduct = await prisma.product.update ({
        where: {id},
        data: {name, description, price, image_url, category}
    })

    res.json(updatedProduct)
}

//removes product items based on the id provided
exports.removeProd = async (req, res) => {
    const id = Number(req.params.id)
    await prisma.product.delete({where: {id}})
    res.status(204).end()
}