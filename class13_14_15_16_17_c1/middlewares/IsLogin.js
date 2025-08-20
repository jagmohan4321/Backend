
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
        // console.log("rquest obnejct in middleware",req.cookies)
        const token = req.cookies.token;
        console.log("token nikal ", token);


        if (!token) {
            return res.status(400).json({
                success: false,
                token: "You are getting empty||null||undefine in token value "
            })
        }

        //token ko verify kar loge
        const nikalLoDataTokense = jwt.verify(token, process.env.JWT_SECRET);
        console.log("arey bhai token me to ye tha ", nikalLoDataTokense);

        if (nikalLoDataTokense.iat > nikalLoDataTokense.exp) {
            return res.json({
                message: "Ap token expire ho gayi hai phir login karke aao",
                success: false
            })

        }
        // agar tumhari token expire nhi hai chale jao controller me 
        next();


    }
    catch (error) {
        console.log("error in ISLogin middleware ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}
