
// if u r getting the token from cookie you have must have to use cookie-parser
//installation-> npm i cookie-parser
// add below code  in  server.js||index.js 
// const cookieParser = require('cookie-parser')
// app.use(cookieParser())

const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.authMiddleware = async (req, res, next) => {
    try {
        // get the token from the body|| header|| authorization ||cookie
        console.log("rquest obnejct in middleware", req.cookies)
        const token = req.cookies.token;
        console.log("token nikal ", token);

        if (!token) {
            return res.status(400).json({
                success: false,
                token: "You are getting empty||null||undefine in token value ",
                message:"You are not a login user please login before access this route "
            })
        }

        //token ko verify kar loge
        // console.log("token", token)
        try {
            const decodePayload = await jwt.verify(token, process.env.JWT_SECRET);
            console.log("Valid token se data ", decodePayload);

            // its must imp line
            req.info = decodePayload;
            // // agar tumhari token expire nhi hai chale jao controller me 
            next();
            // throw ("token got expired")
        }
        catch (error) {
            return res.status(400).json({
                error: error,
                success: false,
                messgage: "Token got expired"
            })
        }

    }
    catch (error) {
        console.log("error in Login middleware ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}
