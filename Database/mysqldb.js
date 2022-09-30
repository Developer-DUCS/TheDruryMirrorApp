// mysqldb.js
// Created: 9/28/2022
// Purpose: 
//  Establish a connection between the application and the database.
//
// Modification Log:
//  9/28/2022: Created file and got it to connect. (Samuel R, Thomas N, Daniel B)






const mysql = require("mysql2");  // Needed mysql2 for the authentication handshake to work
const config = require("./mysqlConfig.json");  // Configuration file for the mysql connection


// Connection variable that holds the configuration details
var conn = mysql.createConnection ({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
});

// Connect to the mysql database
conn.connect(function(err) {
    if (err){
        console.log('Error establishing mysql connection');
        //console.log(err);
    }
    else {
        console.log('connection established');
    }
    
})
module.exports = conn;