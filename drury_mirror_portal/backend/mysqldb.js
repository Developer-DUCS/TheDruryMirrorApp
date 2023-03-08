// mysqldb.js
// Created: 9/28/2022
// Purpose:
//  Establish a connection between the application and the database.
//
// Modification Log:
//  9/28/2022: Created file and got it to connect. (Samuel R, Thomas N, Daniel B)

//Sam's hat syas "Simulated Wheat 8"

// const mysql = require("mysql2"); // Needed mysql2 for the authentication handshake to work
const config = require("./mysqlConfig.json"); // Configuration file for the mysql connection
//import mysql from 'serverless-mysql';
//const mysql = require('serverless-mysql');

//console.log(config.sams_local_db[0]);

// Connection variable that holds the configuration details
// var connThomasUbuntu = mysql.createConnection ({
//     host: config.host,
//     user: config.user,
//     password: config.password,
//     database: config.database,
//     port: config.port
// });
// OR include configuration options

// Change the myUser variable to your username
var myUser = "sam";
// let db = "";
// if (myUser == "sam") {
// 	db = mysql.createConnection({
// 		host: config.sam_local_db[0].host,
// 		user: config.sam_local_db[0].user,
// 		password: config.sam_local_db[0].password,
// 		database: config.sam_local_db[0].database,
// 		port: config.sam_local_db[0].port,
// 	});
// } else if (myUser == "deployment_db") {
// 	db = mysql.createConnection({
// 		host: config.deployment_db[0].host,
// 		user: config.deployment_db[0].user,
// 		password: config.deployment_db[0].password,
// 		database: config.deployment_db[0].database,
// 		port: config.deployment_db[0].port,
// 	});
// } else if (myUser == "daniel") {
// 	db = mysql.createConnection({
// 		host: config.daniel_local_db[0].host,
// 		user: config.daniel_local_db[0].user,
// 		password: config.daniel_local_db[0].password,
// 		database: config.daniel_local_db[0].database,
// 		port: config.daniel_local_db[0].port,
// 	});
// } else if (myUser == "thomasN") {
// 	db = mysql.createConnection({
// 		host: config.thomasN_local_db[0].host,
// 		user: config.thomasN_local_db[0].user,
// 		password: config.thomasN_local_db[0].password,
// 		database: config.thomasN_local_db[0].database,
// 		port: config.thomasN_local_db[0].port,
// 	});
// } else if (myUser == "thomasNWIN") {
// 	db = mysql.createConnection({
// 		host: config.thomasN_local_db_WIN[0].host,
// 		user: config.thomasN_local_db_WIN[0].user,
// 		password: config.thomasN_local_db_WIN[0].password,
// 		database: config.thomasN_local_db_WIN[0].database,
// 		port: config.thomasN_local_db_WIN[0].port,
// 	});
// } else if (myUser == "haley") {
// 	db = mysql.createConnection({
// 		host: config.haley_local_db[0].host,
// 		user: config.haley_local_db[0].user,
// 		password: config.haley_local_db[0].password,
// 		database: config.haley_local_db[0].database,
// 		port: config.haley_local_db[0].port,
// 	});
// } else if (myUser == "thomasO") {
// 	db = mysql.createConnection({
// 		host: config.thomasO_local_db[0].host,
// 		user: config.thomasO_local_db[0].user,
// 		password: config.thomasO_local_db[0].password,
// 		database: config.thomasO_local_db[0].database,
// 		port: config.thomasO_local_db[0].port,
// 	});
// } else if (myUser == "root") {
// 	db = mysql.createConnection({
// 		host: config.root[0].host,
// 		user: config.root[0].user,
// 		password: config.root[0].password,
// 		database: config.root[0].database,
// 		port: config.root[0].port,
// 	});
// }

// db.connect(function (err) {
//     //console.log(`host: ${conn.host}\nuser: ${conn.user}\npassword: ${conn.password}\ndatabase: ${conn.database}\nport: ${conn.port}`);
//     if (err) {
//         console.log("Error establishing mysql connection");
//         //console.log(err);
//     } else {
//         console.log("connection established");
//     }
// });
// module.exports = db;

import mysql2 from "mysql2";

// const mysql = require("serverless-mysql")({
// 	backoff: "decorrelated",
// 	base: 5,
// 	cap: 200,
// });
import mysql from "serverless-mysql";
// host: config.sam_local_db[0].host,
// 		user: config.sam_local_db[0].user,
// 		password: config.sam_local_db[0].password,
// 		database: config.sam_local_db[0].database,
// 		port: config.sam_local_db[0].port,
let db = "";
if (myUser == "sam") {
	db = mysql({
		config: {
			host: config.sam_local_db[0].host,
			user: config.sam_local_db[0].user,
			password: config.sam_local_db[0].password,
			database: config.sam_local_db[0].database,
			port: config.sam_local_db[0].port,
		},
		library: mysql2,
	});
} else if (myUser == "thomasN") {
	db = mysql({
		config: {
			host: config.thomasN_local_db[0].host,
			user: config.thomasN_local_db[0].user,
			password: config.thomasN_local_db[0].password,
			database: config.thomasN_local_db[0].database,
			port: config.thomasN_local_db[0].port,
		},
		library: mysql2,
	});
}

export default async function executeQuery({ query, values }) {
	try {
		const test = await db.connect();
		console.log("Connection test", test);
		const results = await db.query(query, values);
		await db.end();
		db.quit();
		return results;
	} catch (error) {
		console.log("error in executeQuery");
		return { error };
	}
}
// export default async function executeQuery({ query, values }) {
// 	try {
// 		const test = await db.connect();
// 		console.log(test);
// 		const results = await db.query(query, values);
// 		await db.end();
// 		mysql.quit();
// 		return results;
// 	} catch (error) {
// 		return { error };
// 	}
// }

// * https://www.willandskill.se/en/articles/setup-a-next-js-project-with-pm2-nginx-and-yarn-on-ubuntu-18-04
