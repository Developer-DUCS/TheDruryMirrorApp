import executeQuery from "../../backend/mysqldb";

const conn = require("../../backend/mysqldb");

// removed async
export default async (req, res) => {
	try {
		console.log("Called Publish Article route");
		const body = req.body;
		let isDraft = "";

		if (body.page == "copyEditorPortal") {
			isDraft = "4";
		} else {
			isDraft = "5";
		}

		const id = body.id;

		let updateArticleQuery =
			"UPDATE articles SET isDraft = ? WHERE aid = ?";

		const updateArticleResult = await executeQuery({
			query: updateArticleQuery,
			values: [isDraft, id],
		});
		if (updateArticleResult.error) {
			console.log(
				"🚀 ~ file: publishArticle.js:28 ~ updateArticleResult.error:",
				updateArticleResult.error
			);
			return res.status(500).json({ error: "Failed Update" });
		} else {
			return res.status(201).json({ msg: "Successful Update" });
		}

		conn.query(updateArticleQuery, [isDraft, id], (err) => {
			//console.log("Query: ", conn.query(saveQuery, [testAuthor, testHeadline, articleString]))
			if (err) {
				console.log("Something went wrong");
				console.log(err);
				res.status(500).json({ error: "Failed Insertion" });
			} else {
				res.status(201).json({ msg: "Successful Update" });
			}
		});
	} catch (error) {
		console.log(error);
	}
};
