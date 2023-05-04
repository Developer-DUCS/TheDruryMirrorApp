import executeQuery from "../../backend/mysqldb";

export default async (req, res) => {
	let aid = req.body.aid;
	let isDraft = 3;

	let updateIsDraftQuery = "UPDATE articles SET isDraft = ? where aid = ?";
	let result = await executeQuery({
		query: updateIsDraftQuery,
		values: [isDraft, aid],
	});
	if (result.error) {
		console.log("error", result.error);
		return res.status(500).json({
			error: "There was an error sending the article back to editing",
		});
	} else {
		return res.status(200).json({ msg: "successful update" });
	}
};
