require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello, World! PROJECT IS WORKING')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
