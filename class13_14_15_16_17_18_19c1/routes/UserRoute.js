const express = require("express");
const router = express.Router();
const { Signup, ReadUser, getAllUser, updateUserInfo, DeleteAccount, Login, VerifyAccount, ForgotPassword, sendOtpPassword, changePasswordFromProfile } = require("../controllers/Authentication.js");
const { authMiddleware } = require("../middlewares/IsLogin.js");
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/verify-Account", VerifyAccount);
router.post("/reset-password", ForgotPassword);

router.post("/reset-password-otp", sendOtpPassword)

router.get("/single-user/info", authMiddleware, ReadUser);
router.post("/change-password-profile/newpassword", authMiddleware,changePasswordFromProfile );

router.post("/delete", DeleteAccount);
router.post("/update-user", updateUserInfo);
router.post("/all-user", getAllUser);
module.exports = router;