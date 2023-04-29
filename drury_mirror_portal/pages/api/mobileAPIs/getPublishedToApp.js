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
		const isDraft = "5";

		let getPublished =
			"SELECT aid,author,headline,body,isDraft FROM articles WHERE isDraft = ?";
		let getTags = "SELECT * FROM tags WHERE tid = ?";

		let articlesResult = await executeQuery({
			query: getPublished,
			values: isDraft,
		});

		if (articlesResult.error) {
			return res
				.status(500)
				.json({ error: "There was an error loading the articles" });
		} else {
			let articles = [];
			let tagsList = [];
			for (let i = 0; i < articlesResult.length; i++) {
				let tags = await executeQuery({
					query: getTags,
					values: articlesResult[i].aid,
				});
				if (tags.error) {
					console.log(tags.error);
				} else {
					tagsList.push(tags);
				}
				articles.push(articlesResult[i]);
			}

			return res
				.status(200)
				.json({ result: articlesResult, tagsList: tagsList });
		}
	} else {
		res.status(400).json({ msg: "Invalid Request" });
	}
};
