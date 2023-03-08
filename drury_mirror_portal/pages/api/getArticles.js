import { unstable_getServerSession } from "next-auth/next";

import { useSession, signOut, getSession } from "next-auth/react";

import { getToken } from "next-auth/jwt";
import executeQuery from "../../backend/mysqldb";

const conn = require("../../backend/mysqldb");

export default async (req, res) => {
	console.log("called get article route");

	// * Turbo console log
	// * select what to log
	// * ctrl+option+l
	// TODO: install tabnine

	const email = req.body.email;
	console.log("🚀 ~ file: getArticles.js:22 ~ email", email);
	const page = req.body.page;
	console.log("🚀 ~ file: getArticles.js:24 ~ page", page);
	let isDraft = "0";
	const test = 2;

	console.log("email", email);
	console.log("email.length", email.length);
	console.log(typeof email);
	//console.log("session", session)
	//const session = await getSession({req})

	if (page == "draftList") {
		isDraft = "0";
	} else if (page == "copyEditorPortal") {
		isDraft = "1";
	} else if (page == "writerPortal") {
		isDraft = "2";
	} else if (page == "publishPage") {
		isDraft = "4";
	}

	console.log(page);
	console.log(isDraft);

	let getQuery =
		"SELECT aid,author,headline,body,isDraft FROM articles WHERE email = ? AND isDraft = ?";

	let editQuery =
		"SELECT aid,author,headline,body,isDraft FROM articles WHERE email != ? AND (isDraft = 1 OR isDraft =3)";

	let publishQuery =
		"SELECT aid,author,headline,body,isDraft FROM articles WHERE email = ? OR isDraft = ?";

	let query = "";
	if (page == "copyEditorPortal") {
		query = editQuery;
	} else if (page == "publishPage") {
		query = publishQuery;
	} else {
		query = getQuery;
	}

	const result = await executeQuery({
		query: query,
		values: [email, isDraft],
	});
	console.log("🚀 ~ file: getArticles.js:66 ~ result:", result);

	if (result.error) {
		console.log("error", err);
		return res
			.status(500)
			.json({ error: "There was an error loading the articles" });
	} else if (result.length == 0) {
		return res.status(400).json({ error: "No articles found" });
	} else {
		return res.status(200).json(result);
	}

	// conn.query(query, [email, isDraft], (err, rows) => {
	// 	console.log("QUREY:", query);
	// 	console.log("here2");

	// 	if (err) {
	// 		console.log("error", err);
	// 		return res.status(500).json({ error: err });
	// 	} else if (rows.length == 0) {
	// 		return res.status(400).json({ msg: "Articles not found" });
	// 	} else {
	// 		console.log("rows", rows);

	// 		let articles = [];
	// 		rows.forEach((row) => {
	// 			//console.log("row: ", row);

	// 			let article = {
	// 				aid: row.aid,
	// 				author: row.author,
	// 				headline: row.headline,
	// 				body: row.body,
	// 				isDraft: row.isDraft,
	// 			};
	// 			if (page == "publishPage" && article.isDraft != "4") {
	// 				console.log("skipped article:", article);
	// 			} else {
	// 				articles.push(article);
	// 			}
	// 		});
	// 		//console.log(articles);

	// 		return res.status(200).json(articles);
	// 	}
	// });
};
