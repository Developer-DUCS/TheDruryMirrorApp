import executeQuery from "../../backend/mysqldb";

export default async (req, res) => {
	let getTags =
		"SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ?";

	let result = await executeQuery({
		query: getTags,
		values: ["tags"],
	});
	if (result.error) {
		return res
			.status(500)
			.json({ error: "There was an error loading the articles" });
	} else {
		const tags = result
			.map((obj) => obj.COLUMN_NAME) // extract COLUMN_NAME values
			.filter((name) => name !== "tid"); // remove 'tid'
		return res.status(200).json(tags);
	}
};
