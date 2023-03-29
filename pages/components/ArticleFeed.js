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
import Link from "next/link";
import Image from "next/image";
import { Buffer } from "buffer";
import { debounce } from "lodash";

// Components
import Header from "./Header";
import NavBar from "./NavBar";

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

export default function ArticleFeed() {
	const articleStyles = makeStyles((theme) => ({
		container: {
			display: "flex",
			flexDirection: "row",
			height: "auto",
			width: "auto",
			marginBottom: 5,
			borderRadius: 5,
			boxShadow: "0px 4px 5px rgba(0, 0, 0, 1)",
			backgroundColor: "white",
		},
		column: {
			width: "auto",
			height: "auto",
			display: "flex",
		},
		featuredImage: {
			width: 120,
			height: 120,
			borderRadius: 5,
			margin: theme.spacing(1),
		},
		headline: {
			fontFamily: "AvantGarde",
			fontSize: 16,
			width: 200,
			margin: theme.spacing(1),
			marginBottom: 0,
		},
		author: {
			fontFamily: "AvantGarde",
			fontSize: 12,
			width: 150,
			margin: theme.spacing(1),
			marginBottom: theme.spacing(2),
		},
		subtitle: {
			fontFamily: "AvantGarde",
			fontSize: 12,
			margin: theme.spacing(1),
			marginTop: 0,
			width: 200,
		},
	}));

	// For error handling
	const [getMessage, setMessage] = useState("null");
	const [getArticles, setArticles] = useState([]);

	// For searcb bar display property
	const [getDisplay, setDisplay] = useState("none");

	// For search value
	const [getSearchTerm, setSearchTerm] = useState("");

	// To adjust header height
	const [getHeight, setHeight] = useState("55px");

	// To adjust card margin (search header expanded)
	const [getPaddingTop, setPaddingTop] = useState("50px");

	// On search click, set display property to block or none respectively
	function onSearchButtonClick() {
		if (getDisplay == "none") {
			setDisplay("flex");
		}
		if (getDisplay == "flex") {
			setDisplay("none");
		}
		if (getHeight == "55px") {
			setHeight("100px");
		}
		if (getPaddingTop == "50px") {
			setPaddingTop("135px");
		}
		if (getPaddingTop == "135px") {
			setPaddingTop("50px");
		}
	}

	// handleSearch - debounce function
	// - Calls the last onChange event from SearchBar
	// - Prevents database-lookup everytime user inputs a letter rapidly (fast typers)
	const handleSearch = debounce(async (getSearchTerm) => {
		let payload = {
			searchText: getSearchTerm,
		};

		let JSONdata = JSON.stringify(payload);

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSONdata,
		};

		const response = await fetch("/api/GetArticleData", options);

		const data = await response.json();

		if (data) {
			console.log(
				"🚀 ~ file: ArticleFeed.js:88 ~ handleSearch ~ data",
				data
			);
			setArticles(data);
		}
	}, 500);

	// handleInputChange
	// - handles the input change from textfield
	// - react friendly
	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
		handleSearch(event.target.value);
	};

	// useFffect
	// - used to fetch initial article data
	useEffect(() => {
		async function FetchArticles() {
			// API endpoint where we send form data.
			const endpoint = "/api/GetArticles";

			let payload = {
				message: "Sending request...,",
			};

			let JSONdata = JSON.stringify(payload);

			// Form the request for sending data to the server.
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSONdata,
			};

			// Send the form data to our forms API on Vercel and get a response.
			const response = await fetch(endpoint, options);
			const resData = await response.json();
			if (response.status == 200) {
				setArticles(resData);
				setMessage(JSON.stringify(getArticles));
			} else {
				console.log(
					"Error: \n" + response.msg + " \n \n" + response.error
				);
				setMessage(
					"Error: \n" +
						JSON.stringify(response.msg) +
						" \n \n" +
						JSON.stringify(response.error)
				);
			}
		}

		FetchArticles();
	}, []);

	// truncateString
	// - shortens headlines so they fit on cards
	function truncateString(str) {
		let truncated = str.slice(0, 25);
		if (str.length > 25) {
			truncated += "...";
		}
		return truncated;
	}

	// Article Card - stateless functional component
	// - Creates a MUI card component from props with article data
	const ArticleCard = (props) => {
		let thumbnail;

		if (typeof props.article.thumbnailImageData == "string" ||
		typeof props.article.thumbnailImageData === "array" ||
		typeof props.article.thumbnailImageData === "buffer"
		) {
			const imageData = Buffer.from(props.article.thumbnailImageData, 'base64');
			// const decodedString = atob(imageData);
			console.log(imageData);

			thumbnail = (
				<img
					alt="thumbnail"
					src={`${imageData}`}
					width="80"
					height="80"
				/>
			);
		} else {
			thumbnail = (
				<Image
					alt="thumbnail"
					src={DUIcon.src}
					width="80"
					height="80"
				/>
			);
		}

		let newHeadline = truncateString(props.article.headline);

		return (
			<Card
				style={articleStyles.container}
				sx={{ m: 2, marginBottom: 3 }}
			>
				<Link href={`/articles/[${props.article.aid}]`}>
					<CardContent>
						<Box style={articleStyles.column}>
							<Box style={articleStyles.featuredImage}>
								{thumbnail}
							</Box>
							<Box style={articleStyles.column}>
								<Typography
									sx={{
										fontSize: 24,
										fontFamily: "AvantGrande",
										color: "black",
									}}
								>
									{newHeadline}
								</Typography>
								<Typography
									sx={{
										fontSize: 16,
										fontFamily: "AvantGrande",
										color: "black",
									}}
								>
									By {props.article.author}
								</Typography>
								<Typography style={articleStyles.subtitle}>
									{props.subtitle}
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</Link>
			</Card>
		);
	};

	return (
		<Box sx={{ backgroundColor: "#F3F3F3" }}>
			<Box>
				<Box
					style={{
						position: "absolute",
						top: 0,
						width: "100%",
						marginBottom: 10,
					}}
				>
					<AppBar
						position="fixed"
						sx={{
							backgroundColor: "#BC2932",
							height: { getHeight },
						}}
					>
						<Toolbar
							sx={{ display: "flex", flexDirection: "column" }}
						>
							<Grid container>
								<Grid xs={11} item>
									<Link href="/">
										<Button
											variant="text"
											sx={{
												color: "white",
												fontSize: "24px",
												justifyContent: "space-around",
												fontFamily: "TrajanPro-Regular",
											}}
										>
											Drury Mirror
										</Button>
									</Link>
								</Grid>
								<Grid
									xs={1}
									item
									sx={{
										display: "flex",
										justifyContent: "space-around",
									}}
								>
									<IconButton
										edge="start"
										onClick={() => {
											onSearchButtonClick();
										}}
										sx={{ color: "white", display: "flex" }}
										aria-label="menu"
									>
										<SearchIcon />
									</IconButton>
								</Grid>
							</Grid>
							<TextField
								value={getSearchTerm}
								onChange={handleInputChange}
								variant="standard"
								sx={{
									borderWidth: 0,
									display: getDisplay,
									m: 1,
									p: 1,
									borderRadius: 5,
									marginTop: 0,
									width: "99%",
									backgroundColor: "white",
									color: "black",
									disabledUnderline: true,
									inputProps: {
										width: "99%",
										backgroundColor: "white",
										disabledUnderline: true,
									},
								}}
							/>
						</Toolbar>
					</AppBar>
				</Box>
				<Box>
					<IonPage>
						<IonContent>
							<Box sx={{ paddingTop: getPaddingTop }}></Box>
							<Virtuoso
								totalCount={getArticles.length}
								data={getArticles}
								itemContent={(index, article) => {
									return (
										<ArticleCard
											article={article}
											key={index}
										/>
									);
								}}
							/>
							<Box sx={{ marginBottom: 9 }}></Box>
						</IonContent>
					</IonPage>
				</Box>
			</Box>
			<NavBar />
		</Box>
	);
}
