import executeQuery from "../../backend/mysqldb";

export default async (req, res) => {
	console.log("called get tags route");

	let getTags =
		"SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ?";

	let result = await executeQuery({
		query: getTags,
		values: ["tags"],
	});
	if (result.error) {
		console.log("error", result.error);
		return res
			.status(500)
			.json({ error: "There was an error loading the articles" });
	} else {
		const tags = result.slice(1).map((column) => column.COLUMN_NAME);
		console.log("Tags", tags);
		return res.status(200).json(tags);
	}
	console.log(result);
};
