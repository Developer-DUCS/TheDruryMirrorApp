// mysqldb.js
// Created: 9/28/2022
// Purpose:
//  Establish a connection between the application and the database.
//
// Modification Log:
//  9/28/2022: Created file and got it to connect. (Samuel R, Thomas N, Daniel B)
//  4/27/2023: Changed the file to work from the .env file. (Samuel R)

import mysql2 from "mysql2";
import mysql from "serverless-mysql";

const db = mysql({
	config: {
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASS,
		database: process.env.MYSQL_DB,
		port: process.env.MYSQL_PORT,
	},
	library: mysql2,
});

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
		console.log(error);
		return { error };
	}
}

// * https://www.willandskill.se/en/articles/setup-a-next-js-project-with-pm2-nginx-and-yarn-on-ubuntu-18-04
