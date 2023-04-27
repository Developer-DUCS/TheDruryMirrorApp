// getArticle.js
// Page Description:
//                  Landing page for the copy editor after they log in to the site
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 26 2022
//
//Modificaiton Log:
//
//

import executeQuery from "../../backend/mysqldb";

// api route for getting a single article
export default async (req, res) => {
	let id = req.body.id;
	let email = req.body.email;
	let getCommentsQuery = "SELECT * FROM comments WHERE cid = ?;";

	const getCommentsResult = await executeQuery({
		query: getCommentsQuery,
		values: [id],
	});
	if (getCommentsResult.error) {
		return res.status(500).json({ error: getCommentsResult.error });
	} else if (getCommentsResult.length == 0) {
		return res.status(400).json({ msg: "Comments not found" });
	} else {
		let overallComments = getCommentsResult[0].overallComments;
		let comments = getCommentsResult[0].comments;

		let data = {
			overallComments: overallComments,
			comments: comments,
		};
		return res.status(200).json(data);
	}
};
