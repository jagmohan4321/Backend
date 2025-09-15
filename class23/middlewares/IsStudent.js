
exports.studentMiddleware = async (req, res, next) => {
    try {
        // get the token from the body|| header|| authorization ||cookie
        const role = req.info.role;

        if (!role) {
            return res.status(400).json({
                success: false,
                token: "Donot identify you role is missing in student middle ware  "
            })
        }
        if (role === "student") {
            next()
        }
        else {
            return res.status(400).json({
                message: `This is the secure page *****${role}***** not allow to acess it `,
                success: false,

            })
        }

    }
    catch (error) {
        console.log("error in Student middleware ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}
