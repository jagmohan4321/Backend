const express = require("express");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})

//middlerware 
app.use(express.json());

const StudentRoute=require("./routes/StudentRoute.js")
app.use("/api/v1",StudentRoute)


app.get("/", (req, res) => {
    res.send("ME to run ho rha hu")
})

const Conncetion = require("./configuration/DBConnect.js");
Conncetion()