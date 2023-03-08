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

// connection requirement
const conn = require("../../backend/mysqldb");

// api route for getting a single article
export default async (req, res) => {
	//body = req.body
	//articleName = body.articleName
	//console.log("Article Name: ", articleName)

	let id = req.body.id;
	let email = req.body.email;
	console.log("id", id);
	console.log(email);
	let getArticleQuery = "SELECT headline, body FROM articles WHERE aid = ?;";

	const result = await executeQuery({
		query: getArticleQuery,
		values: [id],
	});
	console.log("🚀 ~ file: getArticle.js:32 ~ result:", result);

	if (result.error) {
		return res.status(500).json({ error: err });
	} else if (result.length == 0) {
		return res.status(400).json({ msg: "Articles not found" });
	} else {
		return res.status(200).json(result[0].body);
	}

	// conn.query(getArticleQuery, [id], (err, rows) => {
	//     if (err) {
	//         console.log(err);
	//         return res.status(500).json({ error: err });
	//     } else if (rows.length == 0) {
	//         return res.status(400).json({ msg: "Articles not found" });
	//     } else {
	//         //console.log(rows[0].headline)
	//         //console.log(rows[0].body)
	//         let article = rows[0].body;
	//         console.log(article);
	//         return res.status(200).json(article);
	//     }
	// });
};
