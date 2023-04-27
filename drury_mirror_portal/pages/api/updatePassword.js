// updatePassword.js

import executeQuery from "../../backend/mysqldb";

export default async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	let updatePasswordQuery = "UPDATE users SET password = ? WHERE email = ?";

	let getUser = "SELECT * FROM users WHERE email = ?";

	const result = await executeQuery({
		query: getUser,
		values: email,
	});
	if (result.error) {
		return res.status(500).json({ error: "Error" });
	} else if (result.length < 1) {
		return res.status(404).json({ error: "Email not found" });
	} else if (result.length == 1) {
		const updatePassword = await executeQuery({
			query: updatePasswordQuery,
			values: [password, email],
		});
		if (updatePassword.error) {
			return res.status(500).json({ error: "Error" });
		} else if (updatePassword.affectedRows == 1) {
			return res
				.status(202)
				.json({ msg: "Password updated successfully" });
		} else {
		}
	}
};
