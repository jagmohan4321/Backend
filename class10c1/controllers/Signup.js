const Users = require("../modals/User.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const SendEmailToCustomer = require("../utils/SendEmail.js");
const EmailMessageTemplate=require("../utils/EmailMessageTemplate.js")

async function Signup(req, res) {
    console.log("First")
    try {
        //1. get the data
        const { uName, uEmail, uPass, role } = req.body;

        //2. validate the data

        if (uName === "" && uEmail === "" && uPass === "") {
            return res.status(400).json({
                message: "Data required ",
                success: false
            })
        }






        //3. check the data which is already in db so avoid 
        const isDataExist = await Users.findOne({ uEmail });
        if (isDataExist) {
            return res.status(400).json({
                message: `This emailid ${uEmail} is already in database `,
                success: false
            })
        }


        // password ko encrtpt karna hai koi padh na sake db 
        let encryptPassword;

        try {
            encryptPassword = await bcrypt.hash(uPass, 10)

        }
        catch (error) {
            console.log("Error in Sign hash password try", error)
            return res.status(500).json({
                message: "Error aa gai hai password encry karne ke time par",
                data: newUser
            })


        }

        const otp = await crypto.randomInt(1000, 9999);
        //4.create the data entry in db
        const newUser = await Users.create({ uName, uEmail, uPass: encryptPassword, role, otp });
        await SendEmailToCustomer(newUser.uEmail,"Registraion done, verify account",newUser.uName,newUser.otp);

        //5 return response
        return res.status(201).json({
            message: "Data inserted in DB successfully ",
            data: newUser
        })

    }
    catch (error) {
        console.log("Getting Error in Signup Controller ", error.message)
        res.status(201).json({
            message: "Error occured ",
            success: false
        })
    }

}

module.exports = Signup;