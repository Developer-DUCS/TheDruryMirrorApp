// changeUserRole.js
// Page Description:
//                  API to handle the request for changing a user's role
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Nov. 1 2022
//
//Modificaiton Log:
//
//

import executeQuery from "../../backend/mysqldb";

const conn = require("../../backend/mysqldb");

export default async (req, res) => {
	console.log("Called Update User Status Route");
	const body = req.body;

	let email = body.email;
	let role = body.role;

	console.log(email);
	console.log(role);

	let updateStatusQuery = "UPDATE users SET roles = ? WHERE email = ?";

	let existingQuery = "SELECT email FROM users WHERE email = ?";

	const checkUser = await executeQuery({
		query: existingQuery,
		values: email,
	});
	if (checkUser.length == 1) {
		console.log("user found");
		const updateStatusResult = await executeQuery({
			query: updateStatusQuery,
			values: [role, email],
		});
		if (updateStatusResult.error) {
			console.log(updateStatusResult.error);
			return res.status(500).json({ error: updateStatusResult.error });
		} else {
			res.status(200).json({ msg: "User Role Updated" });
			console.log("User Role Updated");
		}
	} else {
		res.status(401).json({ msg: "User does not exist" });
		console.log("user does not exist");
	}

	// conn.query(existingQuery, [email], (err, rows) => {
	// 	if (rows.length == 1) {
	// 		console.log("user found");
	// 		conn.query(updateStatusQuery, [role, email], (err, rows) => {
	// 			if (err) {
	// 				console.log(err);
	// 				return res.status(500).json({ error: err });
	// 			} else {
	// 				res.status(200).json({ msg: "User Role Updated" });
	// 				console.log("User Role Updated");
	// 			}
	// 		});
	// 	} else {
	// 		res.status(401).json({ msg: "User does not exist" });
	// 		console.log("user does not exist");
	// 	}
	// });
};
