import executeQuery from "../../../backend/mysqldb";

const Cors = require("cors");

// Initializing the cors middleware
const cors = Cors({
	methods: ["POST"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

export default async (req, res) => {
	await runMiddleware(req, res, cors);
	if (req.method === "POST") {
		let searchText = req.body.searchText;
		const isDraft = "5";

		let searchQuery = `SELECT * FROM articles WHERE headline LIKE '%${searchText}%' AND isDraft = ?;`;
		let articlesResult = await executeQuery({
			query: searchQuery,
			values: isDraft,
		});
		if (articlesResult.error) {
			return res
				.status(500)
				.json({ error: "There was an error loading the articles" });
		} else {
			return res.status(200).json({ result: articlesResult });
		}
	} else {
		return res.status(400).json({ msg: "Invalid Request" });
	}
};
