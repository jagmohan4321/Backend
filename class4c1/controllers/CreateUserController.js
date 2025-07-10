const User = require("../modals/User.js");
async function CreateUserController(req, res) {
    const { uName, uEmail, uPass } = req.body;
    console.log("Data", uName, uEmail, uPass)
    const userEntry = await User.create({ uName, uEmail, uPass });
    console.log("I am in Create user")
    res.status(201).json({
        message:"DONE ",
        data:userEntry
    })


}

module.exports = CreateUserController;