const express = require("express");
const router = express.Router();
const { Signup, ReadUser, getAllUser, updateUserInfo, DeleteAccount, Login, VerifyAccount, ForgotPassword, sendOtpPassword } = require("../controllers/Authentication.js");
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/verify-Account", VerifyAccount);
router.post("/reset-password", ForgotPassword);

router.post("/reset-password-otp",sendOtpPassword)
router.post("/single-user/info", ReadUser);
router.post("/delete", DeleteAccount);
router.post("/update-user", updateUserInfo);
router.post("/all-user", getAllUser);
module.exports = router;