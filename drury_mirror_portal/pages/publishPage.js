// CREATED BY THOMAS NIELD

// writerPortal.js
// Page Description:
//                  The home page for the writer
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 4 2022
//
// Modificaiton Log:
//
//
import styles from "../styles/article.module.css";

import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import { Dropdown } from "@nextui-org/react";
import dynamic from "next/dynamic";
import {
	Button,
	Box,
	Typography,
	Stack,
	Card,
	IconButton,
} from "@mui/material";

import Header from "./header";
import ReplyIcon from "@mui/icons-material/Reply";

export function draftList() {
	const router = useRouter();
	const { status, data } = useSession();
	const [getArticles, setArticles] = useState([]);

	// Keep track of the dropdown state
	const [selected, setSelected] = useState(new Set(["unpublished"]));

	const [getTags, setTags] = useState([]);

	const [isError, setIsError] = useState(null);

	const selectedValue = useMemo(
		() => Array.from(selected).join(", ").replaceAll("_", " "),
		[selected]
	);

	const TagSelect = dynamic(() => import("./NextUISelect"));

	const parse = require("html-react-parser");

	// Redirect the user to the log in screen
	const redirectToSignIn = (event) => {
		event.preventDefault();
		router.push("/");
	};

	const publishArticle = async (event) => {
		event.preventDefault();

		let availableTagsRes = await fetch("api/getTags");
		let availableTags = await availableTagsRes.json();

		let tags = event.target[0].getElementsByTagName("div")[0].innerHTML;

		if (tags != []) {
			setIsError(false);
			let endpoint = "api/publishArticle";
			let data = {
				id: event.target[1].id,
				tags: tags,
				availableTags: availableTags,
				action: event.target[1].name,
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

			//reload page upon click of button
			router.reload();
		} else {
			setIsError(true);
		}
	};

	useEffect(() => {
		// Get the articles for the current user from the database
		getArticlesRoute();
	}, [selected]);

	const getArticlesRoute = async () => {
		const session = await getSession();
		let endpoint = "api/getArticles";

		// Make sure there is a session before making the API call
		if (session) {
			let data = {
				email: session.user.email,
				page: "publishPage",
				articleType: selectedValue,
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
				let articles = [];
				let tags = [];
				if (selectedValue == "published") {
					let data = await response.json();
					articles = data.result;
					tags = data.tagsList;

					tags.reverse();

					setTags(tags);
				} else {
					articles = await response.json();
				}

				// Make sure the response was received before setting the articles
				if (articles) {
					setArticles(articles.reverse());
				}
			}
		}
	};

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

	// Send the article back to the editor
	const backToEditing = async (id) => {
		let aid = id.split("k")[1];
		let endpoint = "api/backToEditing";
		let data = {
			aid: aid,
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

		if (response.ok) {
			console.log("Successful update");
			router.reload();
		} else {
			console.log("Failed to update article");
		}
	};

	// Check if the user is authenticated
	const allowedRoles = ["Editor-In-Chief", "Manager"];

	function renderDropdown(aid) {
		if (selectedValue === "unpublished") {
			return (
				<TagSelect
					articleID={aid}
					tags={getTags}
					selectedValueProp={"unpublished"}
				/>
			);
		} else if (selectedValue === "published") {
			return (
				<TagSelect
					articleID={aid}
					tags={getTags}
					selectedValueProp={"published"}
				/>
			);
		}
	}

	function renderButtons(aid) {
		if (selectedValue === "unpublished") {
			return (
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-around",
						marginBottom: 1,
					}}
				>
					<Button
						id={aid}
						name="publishButton"
						variant="contained"
						type="submit"
						sx={{
							marginBottom: 1,
							marginRight: 5,
							marginLeft: -5,
							color: "white",
							backgroundColor: "#4685F5",
							height: 44,
						}}
					>
						Publish Article
					</Button>
					<Button
						variant="contained"
						endIcon={<ReplyIcon />}
						id={`back${aid}`}
						name="back"
						type="button"
						color="error"
						onClick={() => backToEditing(`back${aid}`)}
						sx={{
							borderWidth: 1,
							marginBottom: 1,
							marginLeft: 15,
							borderColor: "black",
						}}
					>
						Send Back
					</Button>
				</Box>
			);
		} else if (selectedValue === "published") {
			return (
				<Button
					id={aid}
					name="unpublishButton"
					variant="contained"
					type="submit"
					sx={{
						marginBottom: 1,
						marginRight: 5,
						color: "white",
						backgroundColor: "#F44336",
						height: 44,
					}}
				>
					Unpublish Article
				</Button>
			);
		} else {
			return null;
		}
	}

	if (status === "authenticated" && allowedRoles.includes(data.user.role)) {
		const role = data.user.role;

		return (
			<Box>
				<Header />

				<Typography variant="copyEditorHeader" sx={{ m: 2 }}>
					Publish Articles
				</Typography>
				<br></br>
				<Typography sx={{ m: 2 }} variant="userLabel">
					{data.user.fname} {data.user.lname}
				</Typography>

				<Box sx={{ m: 1, marginLeft: 2 }}>
					<Dropdown>
						<Dropdown.Button
							flat
							color="primary"
							css={{ tt: "capitalize" }}
						>
							{selectedValue}
						</Dropdown.Button>
						<Dropdown.Menu
							aria-label="Single selection actions"
							color="primary"
							disallowEmptySelection
							selectionMode="single"
							selectedKeys={selected}
							onSelectionChange={setSelected}
						>
							<Dropdown.Item key="unpublished">
								Unpublished
							</Dropdown.Item>
							<Dropdown.Item key="published">
								Published
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Box>
				<Box
					sx={{
						marginTop: -2,
						display: "flex",
						flexDirection: "column",
						minHeight: "100vh",
					}}
				>
					{getArticles.length != 0 ? (
						<div className={styles.divArticle}>
							{getArticles.map((article) => (
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
									<Box sx={{ marginTop: 5 }}>
										<form onSubmit={publishArticle}>
											<div
												style={{
													display: "flex",
													alignItems: "center",
												}}
											>
												<Typography
													sx={{
														color: "#F3f3f3",
														width: "15%",
													}}
												>
													Select Tags
												</Typography>
												<div
													style={{
														marginLeft: "10px",
														marginRight: "10px",
													}}
												>
													{renderDropdown(
														article.aid
													)}
												</div>
												<div
													style={{
														paddingTop: "10px",
														width: "100%",
													}}
												>
													{renderButtons(article.aid)}
												</div>
											</div>
										</form>
										{isError === true && (
											<div>
												<Typography
													variant="h4"
													sx={{
														margin: 2,
														marginTop: 1,
														color: "red",
													}}
												>
													Please select a tag
												</Typography>
											</div>
										)}
									</Box>
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
								There are no {selectedValue} articles.
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
