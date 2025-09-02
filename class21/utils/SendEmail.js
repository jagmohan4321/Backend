const nodemailer = require("nodemailer");
const AccountCreationMail = require("../templates/AccountCreationMail.js");
const PasswordResetSuccessful = require("../templates/PasswordResetSuccessful.js");
const SuccessfulVerifyAccount = require("../templates/SuccessfulVerifyAccount.js");
const ResetPasswordOtp=require("../templates/ResetPasswordOtp.js")
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "smtp@gmail.com",
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASS
    }
})



async function SendEmail(email, subject, firstName, otp, operation) {
    console.log("hey");
    try {
        let htmlContent;

        switch (operation) {
            case "accountCreated":
                htmlContent = AccountCreationMail(firstName, otp);
                break;
            case "resetpasswordotp":
                htmlContent = ResetPasswordOtp(firstName, otp);
                break;
            case "verifyAccount":
                htmlContent = SuccessfulVerifyAccount(firstName);
                break;
            case "resetPassword":
                htmlContent = PasswordResetSuccessful(firstName);
                break;
            default:
                throw new Error("Invalid email operation type");
        }

        await transporter.sendMail({
            from: `"jagmohanrai082@gmail.com`,
            to: email,
            subject: subject,
            html: htmlContent
        });

        console.log(`✅ Email sent for ${operation}`);
    } catch (error) {
        console.log("❌ Error occurred while sending email:", error);
    }
}

module.exports = SendEmail;





module.exports = SendEmail;