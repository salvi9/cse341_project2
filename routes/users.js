const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/users");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/", contactsController.postUser);

router.put("/:id", contactsController.putUser);

router.delete("/:id", contactsController.deleteUser);

module.exports = router;
