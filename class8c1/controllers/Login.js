const Users = require("../modals/User.js");
const bcrypt = require("bcrypt")
async function Login(req, res) {
    try {
        //1. get the data
        const { uEmail, uPass } = req.body;

        console.log("Email, password", uEmail, uPass)
        //2. validate the data
        if (uEmail === "") {
            return res.status(400).json({
                message: "email is required ",
                success: false
            })
        }
        if (uPass === "") {
            return res.status(400).json({
                message: "password is required ",
                success: false
            })
        }

        //3. check the data which is already in db so avoid 
        const isDataExist = await Users.findOne({ uEmail });
        // console.log("Db se ye response aaya hai aapne jo email dee hti",isDataExist)
        if (!isDataExist) {
            return res.status(400).json({
                message: `This emailid ${uEmail} is not in our database `,
                success: false
            })
        }

        //4. Password match kar lo  Normal case 
        // if (isDataExist.uPass !== uPass) {
        //     return res.status(400).json({
        //         message: "Please enter correct password ",

        //     })
        // }


        //Encrypt password compare kar lo using bcrypt comapre function
        
        if (await bcrypt.compare(uPass, isDataExist.uPass)) {
            return res.status(201).json({
                message: "Login Successfully ",
                success: true,

            })
        }
        else {
            return res.status(400).json({
                message: "Please enter correct password ",
            })
        }


        //5 return response


    }
    catch (error) {
        console.log("Getting Error in Login Controller ", error)
        res.status(201).json({
            message: "Error occured ",
            success: false
        })
    }

}

module.exports = Login;