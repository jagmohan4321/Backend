//step1
const nodemailer = require("nodemailer")

//step-2 transporter
const transporter = nodemailer.createTransport({
    service: "smtp@gmail.com",
    tls: {
        rejectUnauthorized: false,
    },
    auth: {
        user: 'jagmohanrai082@gmail.com',
        pass: 'cjbuidrnidanraer',
    },
});


// email ko send kar deba aap 
async function SendEmailToCustomer() {
    console.log("aa gya hai yha par")
    try {
        transporter.sendMail(
            {
                from: "jagmohanrai082@gmail.com",
                to: "jagmohanrai082@gmail.com",
                subject: "Samose bat rhe hai",
                text:"hey",
              
            }
        ).
            then(i => console.log("aa gya na", i)).catch(err => console.log("fat gaye na ", err))
    }
    catch (error) {
        console.log("Error aa gai hai email send karne ke time me ", error)
    }
}

module.exports = SendEmailToCustomer;