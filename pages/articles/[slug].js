// // ---------------------------------------------------
// //
// // NavBar.js
// // - Navigation component at the bottom of the app
// // - Uses next/link to handle navigation between pages
// //
// // Modification Log:
// // 01 05 - Thomas O. created index.js
// //
// // ---------------------------------------------------

// // System stuff
// import React, { useEffect, useState, useCallback } from "react";
// import ReactHtmlParser from "react-html-parser";

// import Link from "next/link";
// import Image from "next/image";
// import { debounce, forEach } from "lodash";

// // Components
// import Header from "../components/Header";
// import NavBar from "../components/NavBar";

// import { Virtuoso } from "react-virtuoso";
// import {
// 	IonAvatar,
// 	IonContent,
// 	IonItem,
// 	IonLabel,
// 	IonPage,
// } from "@ionic/react";

// // Styling
// import {
// 	AppBar,
// 	Toolbar,
// 	Button,
// 	Typography,
// 	IconButton,
// 	Grid,
// 	Box,
// 	Card,
// 	CardContent,
// 	TextField,
// } from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";

// import SearchIcon from "@mui/icons-material/Search";

// import DUIcon from "../../Lib/Images/DU-Small-Icon.png";
// import { Router } from "next/router";

// export default function Article({ resData }) {
// 	// Check if data was returned correctly
// 	console.log("Res Data", resData);

// 	if (resData) {
// 		const sanitizedHtml = resData.body.replace(/<\/?span>/g, "");
// 		console.log("Res Data", resData);

// 		// Check if the article has an image
// 		if (resData.thumbnailImage) {
// 			return (
// 				<Box sx={{ backgroundColor: "#F3F3F3" }}>
// 					<Header />
// 					<Box sx={{ p: 2, marginTop: 8 }}>
// 						<Image src={resData.thumbnailImage} alt="thumbnail" />
// 						<Typography
// 							sx={{
// 								color: "black",
// 								fontFamily: "TrajanPro-Regular",
// 								fontSize: "28px",
// 							}}
// 						>
// 							{resData.headline}
// 						</Typography>
// 						<Typography
// 							sx={{
// 								color: "black",
// 								textIndent: "5%",
// 								textAlign: "justify",
// 								fontFamily: "Garamond-Regular",
// 								fontSize: "18px",
// 								marginTop: 2,
// 							}}
// 						>
// 							{sanitizedHtml}
// 						</Typography>
// 					</Box>
// 					<NavBar />
// 				</Box>
// 			);
// 		} else {
// 			return (
// 				<Box sx={{ backgroundColor: "#F3F3F3" }}>
// 					<Header />
// 					<Box sx={{ p: 2, marginTop: 8 }}>
// 						<Image
// 							alt="thumbnail"
// 							src={DUIcon.src}
// 							width="80"
// 							height="80"
// 						/>
// 						<Typography
// 							sx={{
// 								color: "black",
// 								fontFamily: "TrajanPro-Regular",
// 								fontSize: "28px",
// 							}}
// 						>
// 							{resData.headline}
// 						</Typography>
// 						<Typography
// 							sx={{
// 								color: "black",
// 								fontFamily: "Brown",
// 								fontSize: "14px",
// 								marginTop: 1,
// 								marginLeft: "4px",
// 							}}
// 						>
// 							By {resData.author}
// 						</Typography>
// 						<Typography
// 							sx={{
// 								color: "black",
// 								textIndent: "5%",
// 								textAlign: "justify",
// 								fontFamily: "Garamond-Regular",
// 								fontSize: "18px",
// 								marginTop: 2,
// 							}}
// 						>
// 							{ReactHtmlParser(resData.body)}
// 						</Typography>
// 					</Box>
// 					<NavBar />
// 				</Box>
// 			);
// 		}
// 	} else {
// 		return (
// 			<Box sx={{ backgroundColor: "#F3F3F3" }}>
// 				<Header />
// 				<Typography sx={{ color: "black", m: 1, marginTop: 10 }}>
// 					Loading...
// 				</Typography>
// 				<NavBar />
// 			</Box>
// 		);
// 	}
// }

// // Return a list of possible value for id
// // !!! This function is **SAFE** for backend code, it does not get built into frontend
// export async function getStaticPaths() {
// 	const mysql = require("mysql2"); // Needed mysql2 for the authentication handshake to work

// 	const conn = mysql.createConnection({
// 		host: "127.0.0.1",
// 		user: "sam",
// 		password: "Letmein!22",
// 		database: "drurymirror",
// 		port: "3306",
// 	});

// 	// fetch the article_id for each article
// 	const sql = "SELECT aid FROM articles";
// 	const articles = await new Promise((resolve, reject) => {
// 		conn.query(sql, (error, results, fields) => {
// 			if (error) {
// 				reject(error);
// 			} else {
// 				resolve(results);
// 			}
// 		});
// 	});

// 	let articleSlugs = [];
// 	articles.forEach((article) => {
// 		let slug = article.aid.toString();

// 		console.log(slug);

// 		articleSlugs.push(slug);
// 	});
// 	const paths = articleSlugs.map((slug) => ({
// 		params: { slug },
// 	}));

// 	console.log("🚀 ~ file: [slug].js:107 ~ getStaticPaths ~ paths: \n", paths);

// 	// return the paths
// 	return {
// 		paths,
// 		fallback: true,
// 	};
// }

// // Fetch necessary data for the article
// export async function getStaticProps({ params }) {
// 	let articleID = params.slug[1]; // [5] = 5

// 	let data = {
// 		slug: articleID,
// 	};

// 	console.log("ID: " + articleID);

// 	let payload = JSON.stringify(data);

// 	const options = {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: payload,
// 	};

// 	let response = await fetch(
// 		"http://localhost:3000/api/GetArticleBySlug",
// 		options
// 	);
// 	let resData = await response.json();
// 	console.log(
// 		"🚀 ~ file: [slug].js:153 ~ getStaticProps ~ resData:",
// 		resData
// 	);

// 	return {
// 		props: {
// 			resData,
// 		},
// 	};
// }

// Sam's implementation
import { useRouter } from "next/router";

function Article({ article }) {
	return (
		<div>
			<h1>{article.title}</h1>
			<p>{article.content}</p>
		</div>
	);
}

export default Article;

export async function getStaticProps({ params }) {
	// Fetch article data from an external data source based on the slug
	const article = await fetchArticleBySlug(params.slug);

	// Pass article data as props to the component
	return {
		props: {
			article,
		},
	};
}

export async function getStaticPaths() {
	// Fetch all article slugs from an external data source
	const slugs = await fetchArticleSlugs();

	// Map the slugs to an array of objects with the `params` key
	const paths = slugs.map((slug) => ({
		params: { slug },
	}));

	// Return the array of possible paths
	return {
		paths,
		fallback: false,
	};
}
