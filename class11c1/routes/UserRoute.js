const express = require("express");
const router = express.Router();
const { Signup, ReadUser, getAllUser, updateUserInfo, DeleteAccount } = require("../controllers/Signup.js");
router.post("/signup", Signup);
router.post("/single-user/info", ReadUser);
router.post("/delete", DeleteAccount);
router.post("/update-user", updateUserInfo);
router.post("/all-user", getAllUser);
module.exports = router;