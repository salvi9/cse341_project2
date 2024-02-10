const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/products");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/", contactsController.postProduct);

router.put("/:id", contactsController.putProduct);

router.delete("/:id", contactsController.deleteProduct);

module.exports = router;
