const mongoose = require("mongoose");
require("dotenv").config();
function DbConnection() {
    try {
        mongoose.connect(process.env.DBURL).then(() => {
            console.log("DB Connection done")
        }).catch(e => { console.log("error",e) })
    }
    catch (error) {
        console.log("Error while conneting with DB", error)
    }
}

module.exports=DbConnection;