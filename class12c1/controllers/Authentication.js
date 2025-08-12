const User = require("../modals/User.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const SendEmail = require("../utils/SendEmail.js");
const AccountCrationMail = require("../templates/AccountCreationMail.js")
const SuccessFulVerifyAccount = require("../templates/SuccessFulVerifyAccount.js")
exports.Signup = async (req, res) => {
    try {

        // get the data from the body 
        const { email, password, firstName, lastName } = req.body;

        // data ko validate kar lumnga
        if (email === '' || firstName === "" || lastName === "" || password === "") {
            return res.status(400).json({
                message: "You have to fill all the data values",
                success: false,

            })
        }

        // check karo ki email already to db me to nhi hai
        const userData = await User.findOne({ email });
        if (userData) {
            return res.status(400).json({
                message: `This email ${email} already in db`,
                success: false,
            })
        }

        //check the password length 
        if (password.length < 6) {
            return res.status(400).json({
                message: `Password should be 6 length`,
                success: false,
            })
        }

        // password jo aaya hai use hash karke db me dal do 
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);

        }
        catch (error) {
            console.log("error while hashing the password", error)
        }


        //Otp generate kro 
        const generatedotp = crypto.randomInt(1000, 9999);
        // means aap yha tak aa gaye hai so entry db ke andar cerate kar do
        const newUserData = await User.create({ firstName, lastName, email, password: hashPassword, otp: generatedotp });

        // email send karna hai user ko aapka account create ho gya hai or es otp se account ko veryfy kar lena 
        await SendEmail(email, `Account Creation Success || Verify your Account ${generatedotp}`, firstName, generatedotp, AccountCrationMail)
        return res.status(400).json({
            message: `User registered Successfully`,
            success: true,
            data: newUserData
        })


    }
    catch (error) {
        console.log("error in sign up ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}

exports.VerifyAccount = async (req, res) => {
    try {

        // get the data from the body 
        const { email } = req.body;

        // data ko validate kar lumnga
        if (email === '') {
            return res.status(400).json({
                message: "You have to fill all the data values",
                success: false,

            })
        }

        // check karo ki email already to db me to nhi hai
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                message: `This email ${email} id not in our db`,
                success: false,
            })
        }

        // check kar lo ki aap already to verified user nhi hai 
        if (userData.userData === true) {
            return res.status(400).json({
                message: `You are verified user, you can login`,
                success: false,
            })
        }

        // account ko verify kar do 
        await User.findOneAndUpdate({ _id: userData._id }, { verifyUser: true })
        SendEmail(email, "Account Verify Suceessfully", userData.firstName,undefined, SuccessFulVerifyAccount);
        // email send karna hai user ko aapka account create ho gya hai or es otp se account ko veryfy kar lena 
        return res.status(400).json({
            message: `User registered Successfully`,
            success: true,
        })


    }
    catch (error) {
        console.log("error in sign up ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}

exports.Login = async (req, res) => {
    try {

        // get the data from the body 
        const { email, password } = req.body;

        // data ko validate kar lumnga
        if (email === '' || password === "") {
            return res.status(400).json({
                message: "You have to fill all the data values",
                success: false,

            })
        }

        // check karo ki email already to db me to nhi hai
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                message: `Do not find any account with this  email ${email} id in our db`,
                success: false,
            })
        }


        console.log("userData",typeof(userData.verifyUser))
        // check karo user ka account verified hai ya nhi agar nhi to pahle verify karo
        if ( userData?.verifyUser===false) {
            return res.status(400).json({
                message: `Please verify your account after that you can login`,
                success: false,
            })
        }

        // password jo aaya hai use db ke password se compare karao  
        if (await bcrypt.compare(password, userData.password)) {
            return res.status(200).json({
                message: `User Login Successfully`,
                success: true,
            })
        }
        else {
            return res.status(400).json({
                message: `Password is incorrect`,
                success: true,
            })
        }


    }
    catch (error) {
        console.log("error in sign up ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}



exports.ReadUser = async (req, res) => {
    try {


        // get the data from the body 
        console.log("res", req)
        const { email } = req.body;

        // data ko validate kar lumnga
        if (email === '') {
            return res.status(400).json({
                message: "You have to fill all the data values",
                success: false,

            })
        }

        // check karo ki email already to db me to nhi hai
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                message: `This email ${email} not in db`,
                success: false,
            })
        }








        // means aap yha tak aa gaye hai so entry db ke andar cerate kar do
        const UserData = await User.findOne({ email })
        return res.status(400).json({
            message: `User registered Successfully`,
            success: true,
            data: UserData
        })


    }
    catch (error) {
        console.log("error in sign up ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}

exports.updateUserInfo = async (req, res) => {
    try {


        // get the data from the body 
        console.log("res", req)
        const { email, firstName, lastName } = req.body;

        // data ko validate kar lumnga
        if (email === '' || firstName === "" || lastName === "") {
            return res.status(400).json({
                message: "You have to fill all the data values",
                success: false,

            })
        }

        // check karo ki email already to db me to nhi hai
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                message: `This email ${email} not  in db`,
                success: false,
            })
        }


        // means aap yha tak aa gaye hai so entry db ke andar cerate kar do
        const newUserData = await User.findOneAndUpdate({ email }, { firstName, lastName })
        return res.status(400).json({
            message: `User date updated Successfully`,
            success: true,
            data: newUserData
        })


    }
    catch (error) {
        console.log("error in sign up ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}

exports.DeleteAccount = async (req, res) => {
    try {


        // get the data from the body 
        console.log("res", req)
        const { email } = req.body;

        // data ko validate kar lumnga
        if (email === '') {
            return res.status(400).json({
                message: "You have to fill all the data values",
                success: false,

            })
        }

        // check karo ki email already to db me to nhi hai
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                message: `This email ${email} not in db`,
                success: false,
            })
        }

        // means aap yha tak aa gaye hai so entry db ke andar cerate kar do
        await User.findOneAndDelete({ email })
        return res.status(400).json({
            message: `User deleted Successfully`,
            success: true,
        })


    }
    catch (error) {
        console.log("error in sign up ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}
exports.getAllUser = async (req, res) => {
    try {
        // check karo ki email already to db me to nhi hai
        const userData = await User.find({});
        if (!userData) {
            return res.status(400).json({
                message: `No data found`,
                success: false,
            })
        }

        return res.status(400).json({
            message: "All users data",
            success: true,
            data: userData
        })


    }
    catch (error) {
        console.log("error in sign up ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}