const express = require("express");
const app = express();
const DataBaseConnection = require("./configuration/DataBaseConnection.js");
require("dotenv").config();

//start server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})


const cookieParser = require('cookie-parser')
app.use(cookieParser())
// add the middle ware to extract the data from the body
app.use(express.json());

//demo api 
app.get("/", (req, res) => {
    res.send(`<h1>Home page</h1>`)
})

//db connection ko setup kar leaye
DataBaseConnection();


//mounte kar lo routes ko
const userRoute=require("./routes/UserRoute.js")
app.use("/api/v1/auth",userRoute)