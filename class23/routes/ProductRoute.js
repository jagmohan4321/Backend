const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/IsLogin.js");
// const { teacherMiddleware } = require("../middlewares/isTeacher.js");
const { createProduct, deleteProduct } = require("../controllers/Product.js");
const { adminMiddleware } = require("../middlewares/IsAdmin.js");
const { createCategory, deleteCategory, allCategory, SingleCategory } = require("../controllers/Category.js");


router.post("/create-product/:cid", authMiddleware, adminMiddleware, createProduct);
router.delete("/delete-product/:cid/:pid", authMiddleware, adminMiddleware, deleteProduct);
router.get("/single-category/:cid", SingleCategory);
router.get("/all-category/", allCategory);
router.post("/create-category", authMiddleware, adminMiddleware, createCategory);
router.delete("/delete-category", authMiddleware, adminMiddleware, deleteCategory);

module.exports = router;