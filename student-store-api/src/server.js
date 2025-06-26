require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const productRoutes = require("../routes/product-routes.js")
const orderRoutes = require("../routes/order-routes.js")
const orderItemRoutes = require("../routes/order-items-routes.js")
const morgan = require("morgan");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  
};

app.use(morgan("dev"));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Welcome to Student Store')
})

app.use(express.json())
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)
app.use("/order-items", orderItemRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
