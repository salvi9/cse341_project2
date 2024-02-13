const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const validation = require("../middleware/validate");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/", validation.saveUsers, usersController.postUser);

router.put("/:id", validation.saveUsers, usersController.putUser);

router.delete("/:id", contactsController.deleteUser);

module.exports = router;
