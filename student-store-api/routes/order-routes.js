const express = require("express")
const router = express.Router()
const controller = require("../controllers/order-controller.js")

router.get("/", controller.getAllOrders);
router.get("/:order_id", controller.getOrderById);
router.post("/", controller.createOrder);
router.put("/:order_id", controller.updateOrder);
router.delete("/:order_id", controller.removeOrder);

router.post("/:order_id/items", controller.addOrderItems)
router.get("/:order_id/total", controller.getTotal)

module.exports = router;

