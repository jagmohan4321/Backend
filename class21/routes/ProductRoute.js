const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/IsLogin.js");
const { teacherMiddleware } = require("../middlewares/isTeacher.js");
const { CreateProduct } = require("../controllers/Product.js");
router.post("/create-product", authMiddleware, teacherMiddleware,CreateProduct);

module.exports = router;