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
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import Link from "next/link";
import Image from "next/image";
import { Buffer } from "buffer";
import { debounce } from "lodash";
import { useRouter } from "next/router";

// Redux component
// - helps connect to the navbar for article feed data
import { connect } from "react-redux";

// Components
import NavBar from "./NavBar";

import { Virtuoso } from "react-virtuoso";
import { IonContent, IonPage } from "@ionic/react";

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

// import AppBar from "@material-ui/core/AppBar";
import { SafeArea } from "capacitor-plugin-safe-area";
// import { Plugins } from '@capacitor/core';
// import { makeStyles } from '@material-ui/core/styles';

function ArticleFeed(props) {
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
			padding: 1,
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
		// appBar: {
		// 	paddingTop: `env(safe-area-inset-top)`,
		// 	paddingLeft: `env(safe-area-inset-left)`,
		// 	paddingRight: `env(safe-area-inset-right)`,
		// },
	}));

	// For error handling
	const [getArticles, setArticles] = useState([]);

	// For searcb bar display property
	const [getDisplay, setDisplay] = useState("none");

	// For search value
	const [getSearchTerm, setSearchTerm] = useState("");

	// To adjust header height
	const [getHeight, setHeight] = useState("55px");

	// To adjust card margin (search header expanded)
	const [getPaddingTop, setPaddingTop] = useState("50px");

	const [getArticles2, setArticles2] = useState([]);
	const [getTags, setTags] = useState([]);

	// Get window padding for top safe areas
	const [getSafePaddingTop, setSafePaddingTop] = useState(3);

	const [getScrollPaddingTop, setScrollPaddingTop] = useState(7);

	// This useEffect function automatically adjusts the paddingTop for the header

	useEffect(() => {
		SafeArea.getSafeAreaInsets().then(({ insets }) => {
			console.log(insets);
			setSafePaddingTop(insets.top + "px");
			console.log("Padding Top: ", getSafePaddingTop);
		});
	});

	const getArticlesRoute = async () => {
		let endpoint =
			"https://mcs.drury.edu/mirror/api/mobileAPIs/getPublishedToApp";
		console.log(
			"🚀 ~ file: ArticleFeed.js:122 ~ getArticlesRoute ~ endpoint:",
			endpoint
		);

		let options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			let response = await fetch(endpoint, options);

			if (response.status !== 200) {
				console.log("failed");
			} else {
				let articles = [];
				let tags = [];

				let data = await response.json();
				articles = data.result;
				tags = data.tagsList;

				tags.reverse();
				setTags(tags);

				// Make sure the response was received before setting the articles
				if (articles) {
					setArticles2(articles.reverse());
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getArticlesRoute();
		// console.log(`ARTICLES: ${getArticles2}`);
		// console.log(`TAGS: ${getTags}`);
	}, []);

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

		if (getScrollPaddingTop == 7) {
			setScrollPaddingTop(12);
			console.log("Padding Top: " + getScrollPaddingTop);
		} else {
			setScrollPaddingTop(7);
		}
	}

	// For routing articles
	const router = useRouter();

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

		const response = await fetch(
			"https://mcs.drury.edu/mirror/api/mobileAPIs/mobileAppSearch",
			options
		);

		const data = await response.json();
		let articles = [];
		articles.push(data);
		if (data) {
			// console.log(
			// 	"🚀 ~ file: ArticleFeed.js:88 ~ handleSearch ~ data",
			// 	data
			// );
			setArticles2(data.result);
		}
		console.log("Set Articles 2", getArticles2);
	}, 500);

	// handleInputChange
	// - handles the input change from textfield
	// - react friendly
	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
		handleSearch(event.target.value);
	};

	//-------------------------------------------------------------------//
	//                   UpdateFeed useEffect                            //
	//-------------------------------------------------------------------//

	// useEffect
	// - On page load, return the list of articles according to what's being filtered
	// - Updates every time the user chooses a different tag
	useEffect(() => {
		async function updateFeed() {
			console.log("Page: ", props.currentPage.toLowerCase());

			let notSupported = ["all", "recent"];

			if (!notSupported.includes(props.currentPage.toLowerCase())) {
				let payload = {
					tag: props.currentPage.toLowerCase(),
				};

				console.log("Searching for: " + props.currentPage);

				let JSONdata = JSON.stringify(payload);
				console.log(
					"🚀 ~ file: ArticleFeed.js:246 ~ updateFeed ~ JSONdata:",
					JSONdata
				);

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSONdata,
				};

				const response = await fetch(
					"https://mcs.drury.edu/mirror/api/mobileAPIs/filterByTags",
					options
				);

				const data = await response.json();

				if (data) {
					console.log(
						"🚀 ~ file: ArticleFeed.js:268 ~ updateFeed ~ data:",
						data
					);
					console.log("TYPE: ", typeof data);

					setArticles2(data.reverse());
				}
			} else {
				console.log("Tag was all or recent");
				getArticlesRoute();
			}
		}

		updateFeed();
	}, [props.currentPage]);

	// This useEffect function automatically adjusts the paddingTop for the header
	useEffect(() => {
		SafeArea.getSafeAreaInsets().then(({ insets }) => {
			console.log(insets);
		});
	});

	// truncateString
	// - shortens headlines so they fit on cards
	function truncateString(str) {
		let truncated = str.slice(0, 25);
		if (str.length > 25) {
			truncated += "...";
		}
		return truncated;
	}

	//-------------------------------------------------------------------//
	//                    Article Card Component                         //
	//-------------------------------------------------------------------//

	// Article Card - stateless functional component
	// - Creates a MUI card component from props with article and tag data
	const ArticleCard = (articleData) => {
		let thumbnail;
		let tags = getTags;

		const tidToFind = articleData.article.aid;

		let currTags = null;

		tags.some((arr) => {
			const obj = arr.find((item) => item.tid === tidToFind);
			if (obj) {
				currTags = obj;
				return true;
			}
		});

		if (articleData.article.aid != currTags.tid) {
			console.log("Tags and article id mismatch");
		}
		let activeTags = [];
		for (const key in currTags) {
			const value = currTags[key];
			if (value == 1) {
				activeTags.push(key + " ");
			}
		}

		if (
			typeof articleData.article.thumbnailImageData == "string" ||
			typeof articleData.article.thumbnailImageData === "array" ||
			typeof articleData.article.thumbnailImageData === "buffer"
		) {
			const imageData = Buffer.from(
				articleData.article.thumbnailImageData,
				"base64"
			);
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

		let newHeadline = truncateString(articleData.article.headline);

		function handleArticleClick(e) {
			e.preventDefault();

			console.log("Going to: " + `${asPath}articles/article`);

			// Sends the article articleData to the Redux store's reducer
			console.log("articleData: ", articleData);
			props.dispatch({ type: "SET_ARTICLE_DATA", payload: articleData });

			router.push(`${asPath}articles/article`);
		}

		const { asPath } = useRouter();

		return (
			<Card
				style={articleStyles.container}
				sx={{ m: 2, marginBottom: 3 }}
			>
				<Button
					component="a"
					LinkComponent={Link}
					onClick={handleArticleClick}
				>
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
										textAlign: "left",
									}}
								>
									{newHeadline}
								</Typography>
								<Typography
									sx={{
										fontSize: 16,
										fontFamily: "AvantGrande",
										color: "black",
										textAlign: "left",
									}}
								>
									By {articleData.article.author}
								</Typography>
								<Typography
									sx={{
										fontSize: 16,
										fontFamily: "AvantGrande",
										color: "black",
										textAlign: "left",
									}}
								>
									{activeTags}
								</Typography>
								<Typography style={articleStyles.subtitle}>
									{articleData.subtitle}
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</Button>
			</Card>
		);
	};

	return (
		<>
			{/* <meta
				name="viewport"
				content="initial-scale=1, viewport-fit=cover"
			></meta> */}
			{/* <SafeArea></SafeArea> */}
			<Box sx={{ backgroundColor: "#F3F3F3" }}>
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
							zIndex: 1,
						}}
					>
						<Toolbar
							sx={{
								display: "flex",
								flexDirection: "column",
								paddingTop: getSafePaddingTop,
							}}
						>
							<Grid container>
								<Grid xs={11} item>
									<NextLink
										href="/"
										style={{ color: "white" }}
									>
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
									</NextLink>
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
										sx={{
											color: "white",
											display: "flex",
										}}
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
							<Box
								sx={{ marginTop: getScrollPaddingTop + 5 }}
							></Box>
							<Virtuoso
								totalCount={getArticles2.length}
								data={getArticles2}
								initialItemCount={0}
								itemContent={(index, article) => {
									return (
										<ArticleCard
											article={article}
											// tags={tags}
											key={index}
											index={index}
										/>
									);
								}}
							/>
							<Box sx={{ marginBottom: 15 }}></Box>
						</IonContent>
					</IonPage>
				</Box>
				<NavBar />
			</Box>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		currentPage: state.article.currentPage,
	};
};

export default connect(mapStateToProps)(ArticleFeed);
