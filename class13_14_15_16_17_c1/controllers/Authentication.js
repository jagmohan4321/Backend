const User = require("../modals/User.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const SendEmail = require("../utils/SendEmail.js");
require("dotenv").config();

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
        await SendEmail(email, `Account Creation Success || Verify your Account ${generatedotp}`, firstName, generatedotp, "accountCreated")
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
        const { email, otp } = req.body;

        // data ko validate kar lumnga
        if (email === '') {
            return res.status(400).json({
                message: "You have to enter email",
                success: false,

            })
        }
        if (otp === '') {
            return res.status(400).json({
                message: "You have to fill OTP",
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
        if (userData.verifyUser === true) {
            return res.status(400).json({
                message: `You are verified user, you can login`,
                success: false,
            })
        }



        // match the enter otp with store db otp
        if (otp !== userData.otp) {
            return res.status(400).json({
                message: `OTP miss match, please enter valid otp`,
                success: false,
            })
        }

        // account ko verify kar do 
        await User.findOneAndUpdate({ _id: userData._id }, { verifyUser: true })

        // ++++++++++++++++++++++++++++++++WILL CHECK IT WHERE WE MADE MISTAKE++++++++++++++++++++++++
        // userData.otp = undefined;
        // await userData.save()


        await User.updateOne({ _id: userData._id }, { $unset: { otp: "" } });

        SendEmail(email, "Account Verify Suceessfully", userData.firstName, "", "verifyAccount");
        // email send karna hai user ko aapka account create ho gya hai or es otp se account ko veryfy kar lena 
        return res.status(400).json({
            message: `User Account Verify Sucessfully Successfully`,
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

        console.log("userData", userData)
        // check karo user ka account verified hai ya nhi agar nhi to pahle verify karo
        if (userData?.verifyUser === false) {
            return res.status(400).json({
                message: `Please verify your account after that you can login`,
                success: false,
            })
        }

        // password jo aaya hai use db ke password se compare karao  
        if (await bcrypt.compare(password, userData.password)) {

            // token ko generate kerenge

            const payload = {
                id: userData._id,
                email: userData.email
            }

            const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "60s" });
            console.log("token", token)


            //we are not access token in multiple page or tab
            // return res.status(200).json({
            //     message: `User Login Successfully`,
            //     success: true,
            //     token: token
            // })


            // you have to return token in the form of cookie
            return res.cookie("token", token).status(200).json({
                message: `User Login Successfully`,
                success: true,
                token: token
            })


        }
        else {
            return res.status(400).json({
                message: `Password is incorrect`,
                success: false,
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

exports.sendOtpPassword = async (req, res) => {
    try {

        //get the email id 
        const { email } = req.body;
        //validate the email id
        if (email == "") {
            return res.status(500).json({
                message: "Email value is mandetory",
                success: false,

            })
        }

        // check karo vo email db ke andar hai ya nhi 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({
                message: `No accound found corresponding with ${email}`,
                success: false,

            })
        }

        //generate otp 
        const otp = crypto.randomInt(1000, 9999);
        //send email to the user regarding otp for reset password 
        await SendEmail(email, `Forgot Password OTP ${otp}`, user.firstName, otp, "resetpasswordotp");

        //otp ko db ke andar store karo 

        //db ke andar otp name kee field karna hai


        // await User.create({ otp });
        await User.findOneAndUpdate({ _id: user._id }, { otp })

        return res.status(201).json({
            message: "OTP For reset password sent successfully",
            success: true,
            data: user

        })


    }
    catch (error) {
        console.log("error in Send Otp For Reset password up ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}

exports.ForgotPassword = async (req, res) => {
    try {

        // get the data from the body 
        const { email, newpassword, confirmpassword, otp } = req.body;

        // data ko validate kar lumnga
        if (email === '' || newpassword === "" || confirmpassword === "" || otp == "") {
            return res.status(400).json({
                message: "You have to fill all the data values",
                success: false,

            })
        }

        //Homework-:link url generate kar lena usme token ke base






        // check karo ki email already to db me to nhi hai
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                message: `Do not find any account with this  email ${email} id in our db`,
                success: false,
            })
        }


        console.log("user", userData)
        //otp db vale se compare kar lenge
        if (otp !== userData.otp) {
            return res.status(400).json({
                message: `Otp mismatch cant reset password`,
                success: false,
            })
        }


        // agar user ek verified user nhi hai to vo password reset nhi kar sakta
        if (userData.verifyUser === false) {
            return res.status(400).json({
                message: `You are not a verified user, you can not reset the password`,
                success: false,
            })
        }





        // newpassword and confirm password kee length check kar lo dono kee length same honi chaheaye 
        if (newpassword.length !== confirmpassword.length) {
            return res.status(400).json({
                message: "enter new password length and confirm password length both are different",
                success: false,
            })
        }






        // NEWPASSWORD KEE LENGTH 6 MINIMUM HONI CHAHEAYE 

        if (newpassword.length < 6) {
            return res.status(400).json({
                message: "password and confirm password length can not less than to 6 character",
                success: false,
            })
        }

        // newpassword and confirmpassword ko match kar lo 
        if (newpassword !== confirmpassword) {
            return res.status(400).json({
                message: "password and confirm password are not matching",
                success: false,
            })
        }

        // agar match ho gaye to password ko kar do kon sa newpassword ko and db me store kar do

        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(newpassword, 10);
        }
        catch (error) {
            console.log("error while hashing the password", error)
        }


        // upfdate password in db
        await User.findByIdAndUpdate({ _id: userData._id }, { password: hashPassword })
        SendEmail(email, "Password Reset Suceessfully", userData.firstName, undefined, "resetPassword");

        userData.otp = undefined;
        userData.save()
        return res.status(400).json({
            message: `Password reset successfully`,
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


































exports.ReadUser = async (req, res) => {
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
                message: `This email ${email} not in db`,
                success: false,
            })
        }
        return res.status(200).json({
            message: `User registered Successfully`,
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