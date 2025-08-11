const mongoose = require("mongoose");
require("dotenv").config();
function DataBaseConnection() {
    try {
        mongoose.connect(process.env.DBURL, {}).then(i => console.log("database connecrion done")).catch((error) => {
            throw error
        })

    }
    catch (err) {
        console.log("error occured")
    }
}
module.exports = DataBaseConnection;