const Users = require("../modals/User.js");
async function AllUserController(req, res) {
    try {
        //1.read all the data from the db
        const newUser = await Users.find({});

        //5 return response
        return res.status(201).json({
            message: "Data inserted in DB successfully ",
            data: newUser
        })

    }
    catch (error) {
        console.log("Getting Error in AllUser Controller ", error.message)
        res.status(201).json({
            message: "Error occured ",
            success: false
        })
    }

}

module.exports = AllUserController;