const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");
const validation = require("../middleware/validate");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/", validation.saveProducts, productsController.postProduct);

router.put("/:id", validation.saveProducts, productsController.putProduct);

router.delete("/:id", contactsController.deleteProduct);

module.exports = router;
