// ---------------------------------------------------
//
// NavBar.js
// - Navigation component at the bottom of the app
// - Uses next/link to handle navigation between pages
//
// Modification Log:
// 01 05 - Thomas O. created index.js
//
// ---------------------------------------------------

// System stuff
import React, { useEffect, useState, useCallback } from "react";
import ReactHtmlParser from "react-html-parser";

import Link from "next/link";
import Image from "next/image";
import { debounce, forEach } from "lodash";

// Components
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import { Virtuoso } from "react-virtuoso";
import {
	IonAvatar,
	IonContent,
	IonItem,
	IonLabel,
	IonPage,
} from "@ionic/react";

// Styling
import {
	AppBar,
	Toolbar,
	Button,
	Typography,
	IconButton,
	Grid,
	Box,
	Card,
	CardContent,
	TextField,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@mui/icons-material/Search";

import DUIcon from "../../Lib/Images/DU-Small-Icon.png";

export default function Article({ resData }) {
	// Check if data was returned correctly
	if (resData) {
		const sanitizedHtml = resData.body.replace(/<\/?span>/g, "");

		// Check if the article has an image
		if (resData.thumbnailImage) {
			return (
				<Box sx={{ backgroundColor: "#F3F3F3" }}>
					<Header />
					<Box sx={{ p: 2, marginTop: 8 }}>
						<Image src={resData.thumbnailImage} alt="thumbnail" />
						<Typography
							sx={{
								color: "black",
								fontFamily: "TrajanPro-Regular",
								fontSize: "28px",
							}}
						>
							{resData.headline}
						</Typography>
						<Typography
							sx={{
								color: "black",
								textIndent: "5%",
								textAlign: "justify",
								fontFamily: "Garamond-Regular",
								fontSize: "18px",
								marginTop: 2,
							}}
						>
							{sanitizedHtml}
						</Typography>
					</Box>
					<NavBar />
				</Box>
			);
		} else {
			return (
				<Box sx={{ backgroundColor: "#F3F3F3" }}>
					<Header />
					<Box sx={{ p: 2, marginTop: 8 }}>
						<Image
							alt="thumbnail"
							src={DUIcon.src}
							width="80"
							height="80"
						/>
						<Typography
							sx={{
								color: "black",
								fontFamily: "TrajanPro-Regular",
								fontSize: "28px",
							}}
						>
							{resData.headline}
						</Typography>
						<Typography
							sx={{
								color: "black",
								fontFamily: "Brown",
								fontSize: "14px",
								marginTop: 1,
								marginLeft: "4px",
							}}
						>
							By {resData.author}
						</Typography>
						<Typography
							sx={{
								color: "black",
								textIndent: "5%",
								textAlign: "justify",
								fontFamily: "Garamond-Regular",
								fontSize: "18px",
								marginTop: 2,
							}}
						>
							{ReactHtmlParser(resData.body)}
						</Typography>
					</Box>
					<NavBar />
				</Box>
			);
		}
	} else {
		return (
			<Box sx={{ backgroundColor: "#F3F3F3" }}>
				<Header />
				<Typography sx={{ color: "black", m: 1, marginTop: 10 }}>
					Error
				</Typography>
				<NavBar />
			</Box>
		);
	}
}

// Return a list of possible value for id
// !!! This function is **SAFE** for backend code, it does not get built into frontend
export async function getStaticPaths() {
	const mysql = require("mysql2"); // Needed mysql2 for the authentication handshake to work

	const conn = mysql.createConnection({
		host: "127.0.0.1",
		user: "sam",
		password: "Letmein!22",
		database: "drurymirror",
		port: "3306",
	});

	// connect to the database
	conn.connect();

	// fetch the article_id for each article
	const sql = "SELECT aid FROM articles";
	const articles = await new Promise((resolve, reject) => {
		conn.query(sql, (error, results, fields) => {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});

	// close the database connection
	conn.end();

	// TODO:
	// - for some reason not accepting numbers as slugs?

	let articleSlugs = [];
	articles.forEach((article) => {
		console.log(
			"🚀 ~ file: [slug].js:103 ~ getStaticPaths ~ article:",
			article.aid
		);

		let slug = article.aid.toString();

		articleSlugs.push(slug);
	});
	const paths = articleSlugs.map((slug) => ({
		params: { slug },
	}));

	console.log("🚀 ~ file: [slug].js:107 ~ getStaticPaths ~ paths:", paths);

	// return the paths
	return {
		paths,
		fallback: true,
	};
}

// Fetch necessary data for the article
export async function getStaticProps({ params }) {
	let articleID = params.slug[1]; // [5] = 5

	let data = {
		slug: articleID,
	};

	let payload = JSON.stringify(data);

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: payload,
	};

	const endpoint = "http://localhost:3000/api/GetArticleBySlug";

	let response = await fetch(endpoint, options);
	let resData = await response.json();
	console.log(
		"🚀 ~ file: [slug].js:153 ~ getStaticProps ~ resData:",
		resData
	);

	let article = JSON.stringify(resData);

	return {
		props: {
			resData,
		},
	};
}
