require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const productRoutes = require("../routes/product-routes.js")
const orderRoutes = require("../routes/order-routes.js")

app.get('/', (req, res) => {
    res.send('Welcome to Student Store')
})

app.use(express.json())
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
