// mysqldb.js
// Created: 9/28/2022
// Purpose: 
//  Establish a connection between the application and the database.
//
// Modification Log:
//  9/28/2022: Created file and got it to connect. (Samuel R, Thomas N, Daniel B)



//Sam's hat syas "Simulated Wheat 8"


//const mysql = require("mysql2");  // Needed mysql2 for the authentication handshake to work
const config = require("./mysqlConfig.json");  // Configuration file for the mysql connection
import mysql from 'serverless-mysql';


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
    const db = mysql({
        host: config.sam_local_db[0].host,
        user: config.sam_local_db[0].user,
        password: config.sam_local_db[0].password,
        database: config.sam_local_db[0].database,
        port: config.sam_local_db[0].port
    });
}
else if (myUser == "daniel") {
    const db = mysql({
        host: config.daniel_local_db[0].host,
        user: config.daniel_local_db[0].user,
        password: config.daniel_local_db[0].password,
        database: config.daniel_local_db[0].database,
        port: config.daniel_local_db[0].port
    });
}
else if (myUser == "thomasN") {
    const db = mysql({
        host: config.thomasN_local_db[0].host,
        user: config.thomasN_local_db[0].user,
        password: config.thomasN_local_db[0].password,
        database: config.thomasN_local_db[0].database,
        port: config.thomasN_local_db[0].port
    });
}
else if (myUser == "thomasNWIN") {
    const db = mysql({
        host: config.thomasN_local_db_WIN[0].host,
        user: config.thomasN_local_db_WIN[0].user,
        password: config.thomasN_local_db_WIN[0].password,
        database: config.thomasN_local_db_WIN[0].database,
        port: config.thomasN_local_db_WIN[0].port
    });
}
else if (myUser == "haley") {
    const db = mysql({
        host: config.haley_local_db[0].host,
        user: config.haley_local_db[0].user,
        password: config.haley_local_db[0].password,
        database: config.haley_local_db[0].database,
        port: config.haley_local_db[0].port
    });
}
else if (myUser == "thomasO") {
    const db = mysql({
        host: config.thomasO_local_db[0].host,
        user: config.thomasO_local_db[0].user,
        password: config.thomasO_local_db[0].password,
        database: config.thomasO_local_db[0].database,
        port: config.thomasO_local_db[0].port
    });
}



export default async function excuteQuery({ query, values }) {
    try {
      const results = await db.query(query, values);
      await db.end();
      return results;
    } catch (error) {
      return { error };
    }
  }