import executeQuery from "../../backend/mysqldb";
const conn = require("../../backend/mysqldb");

export default async (req, res) => {
	console.log("called get user route");
	const body = req.body;

	let getQuery =
		"SELECT fname, lname, email, password, roles, active FROM users";

	const result = await executeQuery({
		query: getQuery,
	});

	if (result.error) {
		return res.status(500).json({ error: err });
	} else if (result.length == 0) {
		return res.status(400).json({ msg: "User not found" });
	} else {
		let users = [];
		for (var i = 0; i < result.length; i++) {
			if (result[i].roles != "Manager") {
				users.push(result[i]);
			}
		}
		return res.status(200).json(users);
	}
};
