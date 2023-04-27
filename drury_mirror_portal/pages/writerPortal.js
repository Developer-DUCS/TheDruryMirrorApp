// writerPortal.js
// Page Description:
//                  The home page for the writer
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 4 2022
//
//Modificaiton Log:
//
// 12/03 - Thomas O. standardized the styling on this page to match the other portals' styling
//
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button, Box, Typography, Card, Stack } from "@mui/material";

import Header from "./header";

export function writerPortal() {
	const router = useRouter();
	const { status, data } = useSession();
	const [getArticles, setArticles] = useState([]);
	const parse = require("html-react-parser");

	// Redirect the user to the log in screen
	const redirectToSignIn = (event) => {
		event.preventDefault();
		router.push(`${process.env.NEXT_PUBLIC_API_PATH}/`);
	};

	// Handle the see comments button
	const seeCommentsRoute = async (event) => {
		router.push({
			pathname: `${process.env.NEXT_PUBLIC_API_PATH}/commentViewer`,
			query: { id: event.currentTarget.id },
		});
	};

	useEffect(() => {
		// Get the articles for the current user from the database
		const getArticlesRoute = async () => {
			const session = await getSession();
			let endpoint = `api/getArticles`;

			// Make sure there is a session before making the API call
			if (session) {
				let data = {
					email: session.user.email,
					page: "writerPortal",
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
					// Make sure the response was received before setting the articles
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
		return (
			<Box>
				<Header />

				<Typography variant="copyEditorHeader" sx={{ m: 2 }}>
					Edited Articles
				</Typography>
				<br></br>
				<Typography sx={{ m: 2 }} variant="userLabel">
					{data.user.fname} {data.user.lname}
				</Typography>
				<Box
					sx={{
						marginTop: -2,
						display: "flex",
						flexDirection: "column",
						minHeight: "100vh",
					}}
				>
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
								onClick={seeCommentsRoute}
								sx={{
									marginBottom: 1,
									marginRight: 5,
									color: "white",
									backgroundColor: "#4685F5",
								}}
							>
								Edit Article
							</Button>
						</Card>
					))}
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

export default writerPortal;
