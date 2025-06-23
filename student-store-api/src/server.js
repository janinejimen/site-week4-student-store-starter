require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const productRoutes = require("../routes/student-store-routes.js")

app.get('/', (req, res) => {
    res.send('Hello, World! PROJECT IS WORKING')
})

app.use(express.json());
app.use("/products", productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
