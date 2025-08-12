const nodemailer = require("nodemailer");
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

async function SendEmail(email, subject,firstName,otp,callTemplate) {
    console.log("namaste ",callTemplate)
    try {
        await transporter.sendMail(
            {
                from: "jagmohanrai082@gmail.com",
                to: email,
                subject: subject,
                html: otp!=undefined ?callTemplate(firstName,otp):callTemplate(firstName)
            }
        )

    }
    catch (error) {
        console.log("erorr occured while sending an email", error);
    }

}

module.exports=SendEmail;