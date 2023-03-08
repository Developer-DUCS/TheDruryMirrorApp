import executeQuery from "../../backend/mysqldb";

const conn = require("../../backend/mysqldb");

export default async (req, res) => {
	console.log("Called Create User Route");
	const body = req.body;

	let email = body.email;
	let password = body.password;
	let roles = body.roles;
	let fname = body.fname;
	let lname = body.lname;

	console.log(email);

	let createQuery =
		"INSERT into users (fname, lname, email, password, roles, created, active) VALUES (?, ?, ?, ?, ?, NOW(), '1')";

	let existingQuery = "SELECT email FROM users WHERE email = ?";

	const checkUser = await executeQuery({
		query: existingQuery,
		values: email,
	});
	if (checkUser.length == 0) {
		console.log("user not found, let's create a new one");
		const createUser = await executeQuery({
			query: createQuery,
			values: [fname, lname, email, password, roles],
		});
		if (createUser.error) {
			console.log(
				"🚀 ~ file: createUser.js:33 ~ createUser.error:",
				createUser.error
			);
			return res.status(500).json({ error: createUser.error });
		} else {
			console.log("User Created");
			return res.status(201).json({ msg: "User Created" });
		}
	} else {
		console.log("user already exists");
		return res.status(401).json({ msg: "User already exists" });
	}

	// conn.query(existingQuery, [email], (err, rows) => {
	// 	if (rows.length == 0) {
	// 		console.log("no user found");
	// 		conn.query(
	// 			createQuery,
	// 			[fname, lname, email, password, roles],
	// 			(err, rows) => {
	// 				if (err) {
	// 					console.log(err);
	// 					return res.status(500).json({ error: err });
	// 				} else {
	// 					res.status(201).json({ msg: "User Created" });
	// 					console.log("User Created");
	// 				}
	// 			}
	// 		);
	// 	} else {
	// 		res.status(401).json({ msg: "User already exists" });
	// 		console.log("user already exists");
	// 	}
	// });
};
