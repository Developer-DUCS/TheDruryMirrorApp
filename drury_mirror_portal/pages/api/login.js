// login.js
// Page Description:
//                  The route that selects the user trying to login by match the username and password
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 4 2022
//
//Modification Log:
//                  Added check for whether or not a user is active or deactive Oct. 31 2022
//                  Adapted for serverless mysql. Feb 20, 2023 (SR)
//

import executeQuery from "../../backend/mysqldb";

// const conn = require("../../backend/mysqldb");

export default async (req, res) => {
	console.log("Called Login Route");
	const body = req.body;

	let email = body.email;
	let password = body.password;
	console.log(email, password);

	let authQuery =
		"SELECT fname, lname, email, password, roles, active FROM users WHERE email = ?";

	const result = await executeQuery({
		query: authQuery,
		values: email,
	});
	console.log("Result:", result);
	console.log("Result[0]:", result[0]);

	console.log("Type:", typeof result);
	// Check if the result contains information
	if (result.length > 0) {
		// Make sure it only contains one user
		if (result.length == 1) {
			console.log("One user found");
			// Make sure the password is correct
			if (password == result[0].password) {
				console.log("Password matches");
				let user = {
					fname: result[0].fname,
					lname: result[0].lname,
					email: result[0].email,
					role: result[0].roles,
				};
				console.log("user: ", user);
				res.status(200).json(user);
			} else {
				console.log("Password does not match");
				res.status(401).json({ msg: "User Unauthorized" });
			}
		}
	} else {
		console.log("User not found");
		res.status(401).json({ msg: "User Unauthorized" });
	}
	// conn.query(authQuery, [email], (err, rows) => {
	// 	if (err) return res.status(500).json({ error: err });

	// 	if (rows.length == 0) {
	// 		res.status(400).json({ msg: "User Not Found" }); // check status code
	// 		console.log("User Not Found");
	// 	} else {
	// 		if (password == rows[0].password && rows[0].active == 1) {
	// 			let user = {
	// 				fname: rows[0].fname,
	// 				lname: rows[0].lname,
	// 				email: rows[0].email,
	// 				role: rows[0].roles,
	// 			};
	// 			console.log("user: ", user);
	// 			res.status(200).json(user);
	// 			console.log("User Authenticated");
	// 		} else {
	// 			res.status(401).json({ msg: "User Unauthorized" });
	// 			console.log("User Unauthorized");
	// 		}
	// 	}
	// });
};
