import executeQuery from "../../backend/mysqldb";

const conn = require("../../backend/mysqldb");

export default async (req, res) => {
	const body = req.body;

	let email = body.email;
	let password = body.password;
	let roles = body.roles;
	let fname = body.fname;
	let lname = body.lname;

	let createQuery =
		"INSERT into users (fname, lname, email, password, roles, created, active) VALUES (?, ?, ?, ?, ?, NOW(), '1')";

	let existingQuery = "SELECT email FROM users WHERE email = ?";

	const checkUser = await executeQuery({
		query: existingQuery,
		values: email,
	});
	if (checkUser.length == 0) {
		const createUser = await executeQuery({
			query: createQuery,
			values: [fname, lname, email, password, roles],
		});
		if (createUser.error) {
			return res.status(500).json({ error: createUser.error });
		} else {
			return res.status(201).json({ msg: "User Created" });
		}
	} else {
		return res.status(401).json({ msg: "User already exists" });
	}
};
