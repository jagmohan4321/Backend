const Users = require("../modals/User.js");
async function DeleteUserController(req, res) {
    console.log("First")
    try {
        //1. get the data
        const { userId } = req.params;

        //2. validate the data
        if (userId === "") {
            return res.status(400).json({
                message: "User is not found ",
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

        //4.delete the user details in db
        await Users.findByIdAndDelete({ _id: userId });

        //5 return response
        return res.status(201).json({
            message: "User Deleted Successfully in DB successfully ",
            success: true
        })

    }
    catch (error) {
        console.log("Getting Error in delete User Controller ", error.message)
        res.status(201).json({
            message: "Error occured ",
            success: false
        })
    }

}

module.exports = DeleteUserController;