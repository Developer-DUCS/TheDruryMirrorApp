//Page Description:
//                  Landing page for the copy editor after they log in to the site
//Creation Date:
//                  By: Thomas Nield  Oct. 4 2022
//
//Modificaiton Log:
//
// 12/03 - Thomas O. standardized the styling on this page to match the other portals' styling
//

import styles from "../styles/article.module.css";

import { Button, Typography, Card, Box, Stack } from "@mui/material";

import Header from "./header";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";

//Populates the page
export function copyEditorPortal() {
	const parse = require("html-react-parser");
	const router = useRouter();
	const { status, data } = useSession();
	const [getArticles, setArticles] = useState([]);

	// Redirect the user to the log in screen
	const redirectToSignIn = (event) => {
		event.preventDefault();
		router.push(`${process.env.NEXT_PUBLIC_API_PATH}/`);
	};

	// Handle the edit article button
	const editArticleRoute = async (event) => {
		event.preventDefault();
		router.push({
			pathname: `${process.env.NEXT_PUBLIC_API_PATH}/commentEditor`,
			query: { id: event.currentTarget.id },
		});
	};

	const readyToPublish = async (event) => {
		event.preventDefault();
		// Get data from the form.
		const data = {
			id: event.currentTarget.id,
			page: "copyEditorPortal",
		};

		// Send the data to the server in JSON format.
		const JSONdata = JSON.stringify(data);

		// API endpoint where we send form data.
		const endpoint = "api/publishArticle";

		// Form the request for sending data to the server.
		const options = {
			// The method is POST because we are sending data.
			method: "POST",
			// Tell the server we're sending JSON.
			headers: {
				"Content-Type": "application/json",
			},
			// Body of the request is the JSON data we created above.
			body: JSONdata,
		};

		// Send the form data to our forms API on Vercel and get a response.
		const response = await fetch(endpoint, options);

		// Get the response data from server as JSON.
		// If server returns the name submitted, that means the form works.
		const result = await response.json();

		//reload page upon click of button
		router.reload();
	};

	useEffect(() => {
		// Get the articles for the current user from the database
		const getArticlesRoute = async () => {
			const session = await getSession();

			let endpoint = "api/getArticles";

			// Make sure there is a session before making the API call
			if (session) {
				let data = {
					email: session.user.email,
					page: "copyEditorPortal",
				};
				let JSONdata = JSON.stringify(data);
				let options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					// Body of the request is the JSON data we created above.
					body: JSONdata,
				};

				let response = await fetch(endpoint, options);
				if (response.status != 200) {
				} else {
					let articles = await response.json();

					// Make sure the response was recieved before setting the articles
					if (articles) {
						setArticles(articles.reverse());
					}
				}
			}
		};

		getArticlesRoute();
	}, []);

	// Populate the articles array to display the articles on the page
	let articles = [];
	function filterArticles() {
		// if not default value (meaning it has data)
		if (getArticles != []) {
			getArticles.forEach(checkArticle);
		}
	}

	// Check if the article exists
	function checkArticle(article) {
		if (article) {
			articles.push(article);
		}
	}
	filterArticles();

	const allowedRoles = ["Copy-Editor", "Editor-In-Chief"];

	if (status === "authenticated" && allowedRoles.includes(data.user.role)) {
		return (
			<Box>
				<Header sx={{ marginBottom: 2 }} />
				<Typography variant="copyEditorHeader" sx={{ m: 2 }}>
					Edit Articles
				</Typography>
				<br></br>
				<Typography sx={{ m: 2 }} variant="userLabel">
					{data.user.fname} {data.user.lname}
				</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						minHeight: "100vh",
					}}
				>
					{articles.length != 0 ? (
						<div className={styles.divArticle}>
							{articles.map((article) => (
								<Card
									style={{
										margin: 15,
										marginTop: 30,
										padding: 5,
										paddingLeft: 15,
										boxShadow: 4,
										backgroundColor: "#82858f",
									}}
								>
									<Typography
										variant="headline"
										sx={{ color: "#F3f3f3" }}
									>
										{article.headline}
									</Typography>
									<br></br>
									<Typography
										variant="author"
										sx={{ color: "#F3f3f3" }}
									>
										{article.author}
									</Typography>
									<Typography
										variant="copyEditorBody"
										sx={{
											color: "#F3f3f3",
											overflow: "hidden",
											textOverflow: "ellipsis",
											display: "-webkit-box",
											WebkitLineClamp: "2",
										}}
									>
										{parse(article.body)}
									</Typography>
									<Button
										id={article.aid}
										variant="contained"
										onClick={editArticleRoute}
										sx={{
											marginBottom: 1,
											marginRight: 5,
											color: "white",
											backgroundColor: "#4685F5",
										}}
									>
										Edit Article
									</Button>
									<Button
										id={article.aid}
										variant="contained"
										onClick={readyToPublish}
										sx={{
											marginBottom: 1,
											marginRight: 5,
											color: "white",
											backgroundColor: "#4685F5",
										}}
									>
										Ready to Publish
									</Button>
								</Card>
							))}
						</div>
					) : (
						<Box
							sx={{
								m: 15,
								marginTop: 10,
								padding: 5,
								paddingLeft: 15,
								boxShadow: 4,
							}}
						>
							<Typography>
								You don't have any articles available for
								editing.
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
		);
	} else {
		return (
			<Stack
				display="flex"
				spacing={2}
				justifyContent="center"
				alignItems="center"
			>
				<Typography variant="h2" color="black">
					Please sign in
				</Typography>
				<Button
					variant="contained"
					color="error"
					onClick={redirectToSignIn}
				>
					Sign In
				</Button>
			</Stack>
		);
	}
}

export default copyEditorPortal;
