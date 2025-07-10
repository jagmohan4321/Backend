const express = require("express");
const router = express.Router();
const CreateUserController = require("../controllers/CreateUserController.js");
router.post("/create-user", CreateUserController);
module.exports=router;
