import executeQuery from "../../backend/mysqldb";
const conn = require("../../backend/mysqldb");

export default async (req, res) => {
	console.log("called get user route");
	const body = req.body;

	let getQuery =
		"SELECT fname, lname, email, password, roles, active FROM users";

	const result = await executeQuery({
		query: getQuery,
		// values:
	});
	console.log("🚀 ~ file: getUsers.js:15 ~ result:", result[0]);

	if (result.error) {
		return res.status(500).json({ error: err });
	} else if (result.length == 0) {
		return res.status(400).json({ msg: "User not found" });
	} else {
		let users = [];
		for (var i = 0; i < result.length; i++) {
			console.log("user.role: " + result[i].roles);
			if (result[i].roles != "Manager") {
				users.push(result[i]);
			}
		}
		console.log("Users list: ", users);

		return res.status(200).json(users);
	}

	conn.query(getQuery, (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err });
		} else if (rows.length == 0) {
			return res.status(400).json({ msg: "User not found" });
		} else {
			let users = [];
			rows.forEach((row) => {
				console.log("row: ", row);

				let user = {
					email: row.email,
					password: row.password,
					roles: row.roles,
					active: row.active,
					fname: row.fname,
					lname: row.lname,
				};
				if (user.roles != "Manager") {
					users.push(user);
				}
			});

			console.log("Users list: ", users);

			return res.status(200).json(users);
		}
	});
};
