// Backend testing file for uploading data from the Text Editor to the MySQL database
//
// Documentation Template: 
// - Month/Day: Fname L. Details
//   - More details
//
// Documentation
// - 09/15: Thomas O. Added backend file, npm installed express and bodyparser
//   - Express initializes the backend application
//   - Bodyparser is a middleware for the frontend and backend

const express = require("express");
const PORT = 3000;
const app = express()

//const router = express.Router()


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server Start Failed");
    }
    else {
        console.log(`Server Listening on Port: ${PORT}`);
    }
});