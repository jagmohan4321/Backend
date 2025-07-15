const express = require("express");
const router = express.Router();
const Signup = require("../controllers/Signup.js")
const AllUserControoler = require("../controllers/AllUserController.js");
const DeleteUserController = require("../controllers/DeleteUserController.js");
const UpdateUserController = require("../controllers/UpdateUserController.js");
const Login = require("../controllers/Login.js");
router.post("/signup", Signup);
router.post("/login", Login);
router.get("/all-user", AllUserControoler)
router.delete("/delete-user/:userId", DeleteUserController)
router.put("/update-user", UpdateUserController)
module.exports = router;
