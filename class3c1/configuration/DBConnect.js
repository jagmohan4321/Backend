const mongoose = require("mongoose");
require("dotenv").config();
function Conncetion() {
    try {
        mongoose.connect(process.env.DBURL).
            then(i => console.log("Database connected")).
            catch(e => console.log("error aa gya hai", e))
    }
    catch (error) {
        console.log("error", error)
    }
}

module.exports = Conncetion;