const User = require("../modals/User.js");
const bcrypt = require("bcrypt");
exports.Signup = async (req, res) => {
    try {


        // get the data from the body 
        console.log("res", req)
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





        // means aap yha tak aa gaye hai so entry db ke andar cerate kar do
        const newUserData = await User.create({ firstName, lastName, email, password: hashPassword })
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