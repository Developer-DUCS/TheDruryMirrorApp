import executeQuery from "../../backend/mysqldb";

const conn = require("../../backend/mysqldb");

// removed async
export default async (req, res) => {
	try {
		const body = req.body;
		const action = req.body.action;
		const tags = req.body.tags;
		const availableTags = req.body.availableTags;
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
				isDraft = "4";
				// delete tags query
				setTagsQuery = "delete from tags WHERE tid = ?";
			} else {
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
			return res.status(500).json({ error: "Failed Update" });
		} else {
			if (body.page != "copyEditorPortal") {
				const setTagsResult = await executeQuery({
					query: setTagsQuery,
					values: [id, tags],
				});
				if (setTagsResult.error) {
					return res.status(500).json({ error: "Failed Tags" });
				} else {
					return res.status(201).json({ msg: "Successful Update" });
				}
			} else {
				return res.status(201).json({ msg: "Successful Update" });
			}
		}
	} catch (error) {
		console.log(error);
	}
};
