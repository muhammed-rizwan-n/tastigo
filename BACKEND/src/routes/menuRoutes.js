const express = require("express");
const {getMenu, addMenuItem, updateMenuItem, deleteMenuItem} = require("../controllers/menuController.js");
//import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMenu);
router.post("/update/:id", updateMenuItem);
router.post("/add", addMenuItem);
router.post("/delete/:id", deleteMenuItem);
//router.post("/", protect, adminOnly, addMenuItem);

module.exports = router;
