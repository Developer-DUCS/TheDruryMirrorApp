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
		const availableTags = req.body.availableTags;
		console.log("🚀 ~ file: publishArticle.js:12 ~ tags:", tags);
		console.log("🚀 ~ file: publishArticle.js:12 ~ tags:", typeof tags);
		console.log("Action: " + action);
		let isDraft = "";
		const id = body.id;

		if (body.page == "copyEditorPortal") {
			isDraft = "4";
		} else {
			isDraft = "5";

			var array = tags.split(", ");
			const placeholders = Array(array.length).fill("1").join(",");

			var setTagsQuery = "";
			if (action == "unpublishButton") {
				console.log("ACTION: " + action);
				isDraft = "4";
				// delete tags query
				setTagsQuery = "delete from tags WHERE tid = ?";
			} else {
				console.log("tag length", array.length);
				setTagsQuery = `INSERT INTO tags(tid, ${tags}) VALUES(?,${placeholders})`;
			}

			const compareTags = ["local", "national", "international"];
		}

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
			console.log("Query Tags: ", tags);

			if (body.page != "copyEditorPortal") {
				const setTagsResult = await executeQuery({
					query: setTagsQuery,
					values: [id, tags],
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
			} else {
				return res.status(201).json({ msg: "Successful Update" });
			}
		}

		// conn.query(updateArticleQuery, [isDraft, id], (err) => {
		// 	//console.log("Query: ", conn.query(saveQuery, [testAuthor, testHeadline, articleString]))
		// 	if (err) {
		// 		console.log("Something went wrong");
		// 		console.log(err);
		// 		res.status(500).json({ error: "Failed Insertion" });
		// 	} else {
		// 		res.status(201).json({ msg: "Successful Update" });
		// 	}
		// });
	} catch (error) {
		console.log(error);
	}
};
