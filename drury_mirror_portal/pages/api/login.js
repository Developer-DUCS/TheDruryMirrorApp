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

export default async (req, res) => {
	const body = req.body;

	let email = body.email;
	let password = body.password;

	let authQuery =
		"SELECT fname, lname, email, password, roles, active FROM users WHERE email = ?";

	const result = await executeQuery({
		query: authQuery,
		values: email,
	});

	// Check if the result contains information
	if (result.length > 0) {
		// Make sure it only contains one user
		if (result.length == 1) {
			// Make sure the password is correct
			if (password == result[0].password && result[0].active == 1) {
				let user = {
					fname: result[0].fname,
					lname: result[0].lname,
					email: result[0].email,
					role: result[0].roles,
				};
				res.status(200).json(user);
			} else {
				res.status(401).json({ msg: "User Unauthorized" });
			}
		}
	} else {
		res.status(401).json({ msg: "User Unauthorized" });
	}
};
