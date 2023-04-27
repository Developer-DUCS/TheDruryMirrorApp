import executeQuery from "../../backend/mysqldb";

export default async (req, res) => {
	let tag = req.body.tag;

	let addTag = "ALTER TABLE tags ADD COLUMN `" + tag + "` BOOL";

	let result = await executeQuery({
		query: addTag,
		values: [],
	});
	if (result.error) {
		console.log("error", result.error);
		return res
			.status(500)
			.json({ error: "There was an error loading the articles" });
	} else {
		return res.status(201).json(result);
	}
};
