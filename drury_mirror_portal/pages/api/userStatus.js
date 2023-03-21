// userStatus.js
// Page Description:
//                  API to handle the request for updating a user's status
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Nov. 1 2022
//
//Modificaiton Log:
//
//

import { execOnce } from "next/dist/shared/lib/utils";
import executeQuery from "../../backend/mysqldb";

const conn = require("../../backend/mysqldb");

export default async (req, res) => {
	console.log("Called Update User Status Route");
	const body = req.body;

	let email = body.email;
	let active = body.active;

	// Change the true/false value to 1/0
	if (active) {
		active = 1;
	} else {
		active = 0;
	}

	console.log(email);

	let updateStatusQuery = "UPDATE users SET active = ? WHERE email = ?";

	let existingQuery = "SELECT email FROM users WHERE email = ?";

	const checkUser = await executeQuery({
		query: existingQuery,
		values: email,
	});
	if (checkUser.length == 1) {
		console.log("user found");
		const updateStatusResult = await executeQuery({
			query: updateStatusQuery,
			values: [active, email],
		});
		if (updateStatusResult.error) {
			console.log(
				"🚀 ~ file: userStatus.js:47 ~ updateStatusResult.error:",
				updateStatusResult.error
			);
			return res.status(500).json({ error: updateStatusResult.error });
		} else {
			console.log("User Status Updated");
			return res.status(200).json({ msg: "User Status Updated" });
		}
	} else {
		console.log("user does not exist");
		return res.status(401).json({ msg: "User does not exist" });
	}

	conn.query(existingQuery, [email], (err, rows) => {
		if (rows.length == 1) {
			console.log("user found");
			conn.query(updateStatusQuery, [active, email], (err, rows) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ error: err });
				} else {
					res.status(200).json({ msg: "User Status Updated" });
					console.log("User Status Updated");
				}
			});
		} else {
			res.status(401).json({ msg: "User does not exist" });
			console.log("user does not exist");
		}
	});
};
