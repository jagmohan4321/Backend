// step-1 import express
const express = require("express");

// step-2 create the instance of express (which is responsible for everything)
const app = express();

// step-3 start your server 
// listen()method use to start server which take 2 parameter 1st is port no and is callback function
const PORT = 4000
app.listen(PORT, () => {
    console.log(`My server is running on ${PORT}`)
})

// step-4 to view your webpage on the UI
app.get("/", (request, response) => {
    response.send("<h1>Me hee to hu backend develpoer</h1>");
})
// 