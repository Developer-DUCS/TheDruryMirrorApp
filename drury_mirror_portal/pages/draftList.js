// writerPortal.js
// Page Description:
//                  The home page for the writer
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 4 2022
//
//Modificaiton Log:
//
//
import styles from "../styles/article.module.css";
import { useRouter } from "next/router";
import { useSession, signOut, getSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { Button, Typography, Card, Box, Stack } from "@mui/material";

import Header from "./header";

export function draftList() {
	const router = useRouter();
	const { status, data } = useSession();
	const [getArticles, setArticles] = useState([]);

	const parse = require("html-react-parser");

	// Redirect the user to the log in screen
	const redirectToSignIn = (event) => {
		event.preventDefault();
		router.push("/");
	};

	// Handle the write draft button
	const writeDraftRoute = async (event) => {
		event.preventDefault();
		router.push({
			pathname: `${process.env.NEXT_PUBLIC_API_PATH}/articleWriting`,
			query: { id: event.currentTarget.id },
		});
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
					page: "draftList",
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
				if (response.status !== 200) {
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

	// Check if the user is authenticated
	if (status === "authenticated") {
		const role = data.user.role;

		return (
			<Box>
				<Header />
				<p id="article"></p>
				<Box
					sx={{
						padding: 5,
						paddingLeft: 15,
					}}
				>
					<Typography
						sx={{ m: 1, marginLeft: 0 }}
						variant="copyEditorHeader"
					>
						Drafts
					</Typography>
					<br></br>
					<Typography
						sx={{ m: 1, marginLeft: 0 }}
						variant="userLabel"
					>
						{data.user.fname} {data.user.lname}
					</Typography>
					<br></br>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						minHeight: "100vh",
					}}
				>
					{articles.length != 0 ? (
						<div className={styles.divArticle}>
							<ul>
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
											onClick={writeDraftRoute}
											sx={{
												marginBottom: 1,
												marginRight: 5,
												color: "white",
												backgroundColor: "#4685F5",
											}}
										>
											Keep Writing
										</Button>
									</Card>
								))}
							</ul>
						</div>
					) : (
						<Box
							sx={{
								m: 15,
								marginTop: 0,
								padding: 5,
								paddingLeft: 15,
								boxShadow: 4,
							}}
						>
							<Typography>
								You don't have any articles.
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

export default draftList;
