const Users = require("../modals/User.js");
async function UpdateUserController(req, res) {
    console.log("First")
    try {
        //1. get the data
        const { userId, uName, uEmail, uPass, role } = req.body;

        //2. validate the data
        if (userId === "") {
            return res.status(400).json({
                message: "User is is required ",
                success: false
            })
        }

        // validate kar lo data ko jo update kar rhe ho 

        if (uName === "" && uEmail === "" && uPass === "") {
            return res.status(400).json({
                message: "Data required ",
                success: false
            })
        }


        //3. check the data which is already in db so avoid 
        const isUserExist = await Users.findById({ _id:userId });
        if (!isUserExist) {
            return res.status(400).json({
                message: `No user present in DB related to this id ${userId}`,
                success: false
            })
        }

        //4.Update the user details in db
        await Users.findByIdAndUpdate({ _id: userId }, { uName, uEmail, uPass, role });

        //5 return response
        return res.status(201).json({
            message: "Data Updated in DB successfully ",
            success: true
        })

    }
    catch (error) {
        console.log("Getting Error in updateUserController ", error.message)
        res.status(201).json({
            message: "Error occured ",
            success: false
        })
    }

}

module.exports = UpdateUserController;