const express = require("express");
require("dotenv").config();
const DbConnection = require("./configuration/DbConnection.js")
const app = express();

const PORT = process.env.PORT || 4000

//apply middleware to convert data in json
app.use(express.json());
//Server ko start kro
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})


//Database connectivity
DbConnection();

//Route ko mount karna 
const UserRoute = require("./routes/UserRoute.js");
app.use("/user", UserRoute)

//demo api 
app.get("/", (req, res) => {
    res.send("Home Page")
}) 