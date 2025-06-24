const express = require("express");
const router = express.Router();
const controller = require("../controllers/product-controller.js");

router.get("/", controller.getAllProd);
router.get("/:id", controller.getByIdProd);
router.post("/", controller.createProd);
router.put("/:id", controller.updateProd);
router.delete("/:id", controller.removeProd);



module.exports = router;