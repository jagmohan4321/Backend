const express = require("express");
const router = express.Router();
const CreateUserController = require("../controllers/CreateUserController.js");
const AllUserControoler = require("../controllers/AllUserController.js");
const DeleteUserController = require("../controllers/DeleteUserController.js");
const UpdateUserController = require("../controllers/UpdateUserController.js")
router.post("/create-user", CreateUserController);
router.get("/all-user", AllUserControoler)
router.delete("/delete-user/:userId", DeleteUserController)
router.put("/update-user", UpdateUserController)
module.exports = router;
