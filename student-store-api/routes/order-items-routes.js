const express = require("express")
const router = express.Router()
const controller = require("../controllers/order-item-controller.js")

router.get("/", controller.getAllOrderItems)
router.post("/", controller.createOrderItems)

module.exports = router;