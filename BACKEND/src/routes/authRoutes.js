const express = require("express");
const getUsers = require("../controllers/userController.js").getUsers;

const router = express.Router();

router.post("/signin", getUsers);

module.exports = router;
