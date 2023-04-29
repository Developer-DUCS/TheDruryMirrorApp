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

// Receives a tag and returns the articles that have been published
// and have that tag.
export default async (req, res) => {
	await runMiddleware(req, res, cors);
	if (req.method === "POST") {
		let tag = req.body.tag;
		console.log("🚀 ~ file: filterByTags.js:30 ~ tag:", tag);
		const isDraft = "5";

		let getIdsForTag = `SELECT tid FROM tags WHERE ${tag} = 1`;
		// let getArticlesById = "SELECT * FROM articles WHERE aid = ?";

		let tagIdResult = await executeQuery({
			query: getIdsForTag,
		});
		if (tagIdResult.error) {
			return res
				.status(500)
				.json({ error: "There was an error getting the tags" });
		} else {
			// put the ids in a list and prepare them for the query
			let ids = [];
			for (let i = 0; i < tagIdResult.length; i++) {
				console.log(tagIdResult[i]);
				ids.push(tagIdResult[i].tid);
			}
			let idStr = ids.join(",");
			let getArticlesById = `SELECT * FROM articles WHERE aid IN (${idStr})`;

			let articlesResult = await executeQuery({
				query: getArticlesById,
			});
			if (articlesResult.error) {
				return res
					.status(500)
					.json({ error: "There was an error getting the articles" });
			} else {
				console.log(articlesResult);
				return res.status(200).json(articlesResult);
			}
		}
	}
};
