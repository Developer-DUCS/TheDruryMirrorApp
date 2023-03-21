// deleteUser.js
// Page Description:
//                  API to handle the request for deleting a user
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Nov. 1 2022
//
//Modificaiton Log:
//
//

import executeQuery from "../../backend/mysqldb";

const conn = require("../../backend/mysqldb");

export default async (req, res) => {
	console.log("Called Delete User Route");
	const body = req.body;

	let email = body.email;

	console.log(email);

	let deleteQuery = "DELETE FROM users WHERE email = ?";

	let existingQuery = "SELECT email FROM users WHERE email = ?";

	const checkUser = await executeQuery({
		query: existingQuery,
		values: email,
	});
	if (checkUser.length == 1) {
		console.log("user found");
		const deleteUserResult = await executeQuery({
			query: deleteQuery,
			values: email,
		});
		if (deleteUserResult.error) {
			console.log(
				"🚀 ~ file: deleteUser.js:39 ~ deleteUserResult.error:",
				deleteUserResult.error
			);
			return res.status(500).json({ error: deleteQuery.error });
		} else {
			console.log("User Deleted");
			return res.status(204).json({ msg: "User Deleted" });
		}
	} else {
		console.log("user does not exist");
		return res.status(401).json({ msg: "User does not exist" });
	}

	// conn.query(existingQuery, [email], (err, rows) => {
	// 	if (rows.length == 1) {
	// 		console.log("user found");
	// 		conn.query(deleteQuery, [email], (err, rows) => {
	// 			if (err) {
	// 				console.log(err);
	// 				return res.status(500).json({ error: err });
	// 			} else {
	// 				res.status(204).json({ msg: "User Deleted" });
	// 				console.log("User Deleted");
	// 			}
	// 		});
	// 	} else {
	// 		res.status(401).json({ msg: "User does not exist" });
	// 		console.log("user does not exist");
	// 	}
	// });
};
