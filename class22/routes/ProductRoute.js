const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/IsLogin.js");
const { teacherMiddleware } = require("../middlewares/isTeacher.js");
const { CreateProduct } = require("../controllers/Product.js");
const { adminMiddleware } = require("../middlewares/IsAdmin.js");
const { CreateCategory,DeleteCategory } = require("../controllers/Category.js");


router.post("/create-product/:cid", authMiddleware, adminMiddleware, CreateProduct);
router.delete("/delete-product/:pid", authMiddleware, adminMiddleware, CreateProduct);
router.post("/create-category", authMiddleware, adminMiddleware,CreateCategory);
router.delete("/delete-category", authMiddleware, teacherMiddleware, CreateProduct);

module.exports = router;