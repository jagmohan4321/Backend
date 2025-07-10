const mongoose = require("mongoose");
function DbConnection() {
    try {
        mongoose.connect(process.env.DBURL).then(() => {
            console.log("DB Connection done")
        }).catch(e => { console.log("error") })
    }
    catch (error) {
        console.log("Error while conneting with DB", error)
    }
}

module.exports=DbConnection;