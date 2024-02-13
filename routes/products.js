const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");
const validation = require("../middleware/validate");

router.get("/", productsController.getAll);

router.get("/:id", productsController.getSingle);

router.post("/", validation.saveProducts, productsController.postProduct);

router.put("/:id", validation.saveProducts, productsController.putProduct);

router.delete("/:id", productsController.deleteProduct);

module.exports = router;
