import executeQuery from "../../backend/mysqldb";

const conn = require("../../backend/mysqldb");

// removed async
export default async (req, res) => {
	try {
		console.log("Called Publish Article route");
		const body = req.body;
		console.log("🚀 ~ file: publishArticle.js:10 ~ body:", body);
		const action = req.body.action;
		const tags = req.body.tags;
		console.log("🚀 ~ file: publishArticle.js:12 ~ tags:", tags);
		console.log("🚀 ~ file: publishArticle.js:12 ~ tags:", typeof tags);
		console.log("Action: " + action);
		let isDraft = "";

		if (body.page == "copyEditorPortal") {
			isDraft = "4";
		} else {
			isDraft = "5";
		}

		if (action == "unpublishButton") {
			console.log("ACTION: " + action);
			isDraft = "4";
		}
		const compareTags = ["local", "national", "international"];
		var array = tags.split(", ");
		console.log("🚀 ~ file: publishArticle.js:29 ~ array:", array);
		// let local = false
		// let national = false
		// let international = false
		// for (let i = 0; i < compareTags.length; i++) {
		// 	if (array.includes(compareTags[i])) {
		// 		console.log("Match");

		// 	}
		// }
		const [local, national, international] = compareTags.map((tag) =>
			array.includes(tag)
		);
		console.log(
			"🚀 ~ file: publishArticle.js:42 ~ local, national, international:",
			local,
			national,
			international
		);
		const id = body.id;

		let updateArticleQuery =
			"UPDATE articles SET isDraft = ? WHERE aid = ?";

		let setTagsQuery =
			"INSERT INTO tags(tid, local, national, international) VALUES(?,?,?,?)";

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
			const setTagsResult = await executeQuery({
				query: setTagsQuery,
				values: [id, local, national, international],
			});
			if (setTagsResult.error) {
				console.log(
					"🚀 ~ file: publishArticle.js:64 ~ setTagsResult.error:",
					setTagsResult.error
				);
				return res.status(500).json({ error: "Failed Tags" });
			} else {
				return res.status(201).json({ msg: "Successful Update" });
			}
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
