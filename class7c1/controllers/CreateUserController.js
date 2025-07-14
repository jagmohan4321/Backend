const Users = require("../modals/User.js");
async function CreateUserController(req, res) {
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

        //4.create the data entry in db
        const newUser = await Users.create({ uName, uEmail, uPass, role });

        //5 return response
        return res.status(201).json({
            message: "Data inserted in DB successfully ",
            data: newUser
        })

    }
    catch (error) {
        console.log("Getting Error in CreateUserController ", error.message)
        res.status(201).json({
            message: "Error occured ",
            success: false
        })
    }

}

module.exports = CreateUserController;