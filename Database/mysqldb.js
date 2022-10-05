// mysqldb.js
// Created: 9/28/2022
// Purpose: 
//  Establish a connection between the application and the database.
//
// Modification Log:
//  9/28/2022: Created file and got it to connect. (Samuel R, Thomas N, Daniel B)






const mysql = require("mysql2");  // Needed mysql2 for the authentication handshake to work
const config = require("./mysqlConfig.json");  // Configuration file for the mysql connection

//console.log(config.sams_local_db[0]);

// Connection variable that holds the configuration details
// var connThomasUbuntu = mysql.createConnection ({
//     host: config.host,
//     user: config.user,
//     password: config.password,
//     database: config.database,
//     port: config.port
// });

// Change the myUser variable to your username 
var myUser = "sam";

if (myUser == "sam") {
    var conn = mysql.createConnection({
        host: config.sam_local_db[0].host,
        user: config.sam_local_db[0].user,
        password: config.sam_local_db[0].password,
        database: config.sam_local_db[0].database,
        port: config.sam_local_db[0].port
    });
}
else if (myUser == "daniel") {
    var conn = mysql.createConnection({
        host: config.daniel_local_db[0].host,
        user: config.daniel_local_db[0].user,
        password: config.daniel_local_db[0].password,
        database: config.daniel_local_db[0].database,
        port: config.daniel_local_db[0].port
    });
}
else if (myUser == "thomasN") {
    var conn = mysql.createConnection({
        host: config.thomasN_local_db[0].host,
        user: config.thomasN_local_db[0].user,
        password: config.thomasN_local_db[0].password,
        database: config.thomasN_local_db[0].database,
        port: config.thomasN_local_db[0].port
    });
}
else if (myUser == "haley") {
    var conn = mysql.createConnection({
        host: config.haley_local_db[0].host,
        user: config.haley_local_db[0].user,
        password: config.haley_local_db[0].password,
        database: config.haley_local_db[0].database,
        port: config.haley_local_db[0].port
    });
}
else if (myUser == "thomasO") {
    var conn = mysql.createConnection({
        host: config.thomasO_local_db[0].host,
        user: config.thomasO_local_db[0].user,
        password: config.thomasO_local_db[0].password,
        database: config.thomasO_local_db[0].database,
        port: config.thomasO_local_db[0].port
    });
}


// var conn = mysql.createConnection(config.sams_local_db[0]);


//var connectionList = [connThomasUbuntu, connSam];
//console.log(`host: ${config.sams_local_db[0].host}\nuser: ${config.sams_local_db[0].user}\npassword: ${config.sams_local_db[0].password}\ndatabase: ${config.sams_local_db[0].database}\nport: ${config.sams_local_db[0].port}`);
//console.log(`\nConn: ${conn}`);
// Connect to the mysql database
conn.connect(function(err) {
    //console.log(`host: ${conn.host}\nuser: ${conn.user}\npassword: ${conn.password}\ndatabase: ${conn.database}\nport: ${conn.port}`);
    if (err){
        console.log('Error establishing mysql connection');
        //console.log(err);
    }
    else {
        console.log('connection established');
    }
    
});
module.exports = conn;