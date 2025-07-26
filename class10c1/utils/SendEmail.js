//step1
const nodemailer = require("nodemailer")
const EmailMessageTemplate=require("../utils/EmailMessageTemplate.js")

//step-2 transporter
const transporter = nodemailer.createTransport({
    service: "smtp@gmail.com",
    tls: {
        rejectUnauthorized: false,
    },
    auth: {
        user: 'jagmohanrai082@gmail.com',
        pass: 'eoxkvfdhvxmcgbfr',
    },
});


// email ko send kar deba aap 
async function SendEmailToCustomer(UserEmail, emailKaSubject,userName,otp) {
    console.log("aa gya hai yha par")
    try {
        await transporter.sendMail(
            {
                from: "jagmohanrai082@gmail.com",
                to: UserEmail,
                subject: emailKaSubject,
                html: EmailMessageTemplate(userName,otp)
            }
        )
    }
    catch (error) {
        console.log("Error aa gai hai email send karne ke time me ", error)
    }
}

module.exports = SendEmailToCustomer;