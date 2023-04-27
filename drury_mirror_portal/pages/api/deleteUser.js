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
	const body = req.body;

	let email = body.email;

	let deleteQuery = "DELETE FROM users WHERE email = ?";

	let existingQuery = "SELECT email FROM users WHERE email = ?";

	const checkUser = await executeQuery({
		query: existingQuery,
		values: email,
	});
	if (checkUser.length == 1) {
		const deleteUserResult = await executeQuery({
			query: deleteQuery,
			values: email,
		});
		if (deleteUserResult.error) {
			return res.status(500).json({ error: deleteQuery.error });
		} else {
			return res.status(204).json({ msg: "User Deleted" });
		}
	} else {
		return res.status(401).json({ msg: "User does not exist" });
	}
};
