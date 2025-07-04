//step-1 import express
const express = require("express");

//step-2 create the instance of express application
const app = express();


//step-3 start your server via listen method
//listen methos take 2 parameter 1st port no. 2nd callback function 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})


//step-4 meke demo path to check your server is running or not 
app.get("/", (request, response) => {
    response.send(`<h1>Our server is running at ${PORT} </h1>
        </br>
        <p>Home Page</p>`)
})

// step-5 Database connectivity (kosis karo sabhi import vale statement sabse upar ho )
const mongoose = require("mongoose");
function dataBaseConnection() {
    try {
        mongoose.connect("mongodb://localhost:27017/CodeClimber").
            then(() => console.log("Dekh rhe ho Vinod=>Database ke sath rista ho gya hai matlab ham conncet ho gye hai ")).
            catch((error) => {
                console.log("Dekh rhe ho vinod database connection fail ho gya hai ")
                throw ("ham to fat gaye hai hamare logic ke karan ")
            })

    }
    catch (error) {
        console.log("Database se connection nhi ho paya error aa gai", error)
    }
}

dataBaseConnection();
