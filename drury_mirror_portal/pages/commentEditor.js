// commentEditor.js
// Page Description:
//                  Page for the Copy Editor to edit the articles that have been
//                  saved as drafts.
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 27 2022
//
//Modificaiton Log:
//                  !!!!ADD COMMENT BUG: CANT HANDLE A SINGLE HIGHLIGHTED SPACE IN THE TEXT!!!!
//                  !!!!ADD COMMENT BUG: CAN'T COMMENT OVER AN EXIST COMMENT!!!!
//                  TODO:: FIX NAMING CONVENTIONS
//
//

// Editor imports
import "react-quill/dist/quill.snow.css";
import styles from "../styles/quill.module.css";
import styles2 from "../styles/article.module.css";
import { styled } from "@mui/material/styles";

// Styling (Material UI) imports
import {
	Button,
	Container,
	TextField,
	Box,
	Typography,
	Stack,
	Grid,
} from "@mui/material";
import { withStyles } from "@mui/styles";

import Header from "./header";

// React and Next imports
import { ReactDOM } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { createRoot, hydrateRoot } from "react-dom/client";
import { useSession, signOut, getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

// we import react-quill dynamically, to avoid including it in server-side
// and we will render a loading state while the dynamic component is being loaded.
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});

// - TextField component with style
const CssTextField = withStyles({
	root: {
		"& .MuiFilledInput-root": {
			background: "white",
			borderRadius: 3,
		},
		"& label.Mui-focused": {
			color: "black",
			borderRadius: 3,
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "black",
			backgroundColor: "black",
			borderRadius: 3,
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "black",
				borderRadius: 3,
			},
			"&:hover fieldset": {
				borderColor: "black",
				borderRadius: 3,
			},
			"&.Mui-focused fieldset": {
				borderColor: "black",
				borderRadius: 3,
			},
		},
	},
})(TextField);

const articleModules = {
	toolbar: [["bold", "italic", "underline", "strike"], [{ background: [] }]],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	},
};

const articleFormats = ["bold", "italic", "underline", "strike", "background"];

const modules = {
	toolbar: [
		[{ header: "1" }, { header: "2" }],
		["bold", "italic", "underline", "strike"],
		[{ color: [] }, { background: [] }],
		[{ list: "ordered" }, { list: "bullet" }],
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	},
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"color",
	"background",
	"list",
	"bullet",
];

let commentId = 0;
let allComments = [];

export function commentEditor() {
	const router = useRouter();

	// Put the article from the api in the left editor and handle the
	// changes that the copy editor makes

	let [value, setValue] = useState();
	const [getArticle, setArticle] = useState([]);
	const [getHeadline, setHeadline] = useState([]);
	const [isError, setIsError] = useState(null);
	const { status, data } = useSession();

	// Redirect the user to the
	const redirectToSignIn = (event) => {
		event.preventDefault();
		router.push(`${process.env.NEXT_PUBLIC_API_PATH}/`);
	};

	// loads the article into the editor
	useEffect(() => {
		if (getArticle != []) {
			let myArticle = getArticle;
			let myHeadline = getHeadline;

			//myArticle = myArticle.toString();

			setValue(myArticle);
		}
	}, [getArticle]);

	const addComment = async (event) => {
		// Increment the commentId count
		commentId = commentId + 1;

		// Get the range of the current selection
		var range = window.getSelection().getRangeAt(0);

		// Get the text content of the current selection
		// the length of this needs to be determined
		let textContent = window.getSelection().toString();

		// Create a new span element
		var span = document.createElement("span");
		span.style.backgroundColor = "yellow";

		// Create the new id for the new span element
		let id = "span" + commentId;
		span.id = id;

		// Wrap the selected content in the span element
		span.appendChild(range.extractContents());

		// Replace the selected content with the span element
		range.insertNode(span);

		const styledCommentBox = () => {
			return (
				<>
					<CssTextField
						id={`input${commentId}`}
						onMouseEnter={mouseover}
						onMouseLeave={mouseleave}
						variant="filled"
						name="commentTest"
						sx={{
							input: {
								color: "black",
								background: "white",
								borderRadius: 3,
							},
							borderRadius: 3,
						}}
						multiline
						rows={2}
						maxRows={4}
					></CssTextField>
					<br></br>
				</>
			);
		};

		var commentBox = React.createElement(styledCommentBox, {
			id: `input 5`,
		});

		// Label stateless functional component (SFC)
		const LabelComponent = () => {
			return (
				<>
					<Typography variant="body1" sx={{ color: "white", m: 1 }}>
						{textContent}
					</Typography>
				</>
			);
		};

		// Creates label element, just a MUI typography element
		var label = React.createElement(LabelComponent, {
			id: `label ${commentId}`,
		});

		// Stateless functional component button used for "resolve"
		const styledButton = () => {
			return (
				<Button
					id={`button${commentId}`}
					onClick={(event) => {
						resolve(event);
					}}
					variant="contained"
					color="error"
					sx={{ margin: 2, marginLeft: 0 }}
				>
					Delete
				</Button>
			);
		};

		// Creates a button element
		var button = React.createElement(styledButton);

		// Box containing each component generated from "Add Comment" button
		// - each component is rendered whenever the box is rendered because they are children of the box
		var box = React.createElement(
			Box,
			{
				id: `div${commentId}`,
			},
			label,
			commentBox,
			button
		);

		// ----------------------RENDER OBJECTS-------------------------- //
		const rootID = document.getElementById("currentComments");
		const root = createRoot(rootID);

		allComments.push(box);
	};

	const resolve = async (event) => {
		// document.getElementById(`div ${commentId}`).remove();
		let buttonId = event.target.id;

		//Splits the number from the id of the button
		let num = buttonId.split("n");

		//Uses the number from the button id to get the id of the div its in
		let tempDiv = "div";
		let tempDivId = tempDiv.concat(num[1].toString());

		//Uses the number from the button id to get the id of the span with the related comment
		let tempSpan = "span";
		let tempSpanId = tempSpan.concat(num[1].toString());

		//Removes the span tags around the comment
		if (document.getElementById(tempSpanId)) {
			document.getElementById(tempSpanId).removeAttribute("style");
		}

		//Removes the div that the button that is clicked is in
		document.getElementById(tempDivId).remove();

		//Prevents the page from completely reloading
		event.preventDefault();
		// let currentCommentID = "span" + commentId;
		// let spanElement = document.getElementById(currentCommentID);

		// if (spanElement) {
		//     spanElement.removeAttribute("style", "background-color: yellow");
		// }
	};

	const mouseover = async (event) => {
		let inputId = event.target.id;

		// let currentCommentID = "span" + commentId;

		let num = inputId.split("t");
		if (num[1]) {
			let tempCom = "span";
			let tempComId = tempCom.concat(num[1].toString());

			if (document.getElementById(tempComId)) {
				document
					.getElementById(tempComId)
					.setAttribute(
						"style",
						"background-color: rgb(0,0,255); color:white;"
					);
			} else {
			}
		}
	};

	const mouseleave = async (event) => {
		let inputId = event.target.id;

		let num = inputId.split("t");
		if (num[1]) {
			let tempCom = "span";
			let tempComId = tempCom.concat(num[1].toString());

			document
				.getElementById(tempComId)
				.setAttribute(
					"style",
					"background-color: rgb(255,255,0); color:black;"
				);
		}
	};

	const submit = async (event) => {
		event.preventDefault();
		const id = parseInt(router.query.id);
		let x = event.target.commentTest;
		let y = x.length;
		let i = 0;
		let commentsArray = [];
		let overAllComments = event.target.overAllComments.value;

		if (y > 0) {
			while (y > 0) {
				if (x[i].value != null) {
					let com = [x[i].value, x[i].id];
					commentsArray.push(com);
					y = y - 1;
				}
				i = i + 1;
			}
		} else {
		}

		event.preventDefault();
		let session = await getSession();
		let editor = session.user.fname + " " + session.user.lname;
		console.log("Headline: " + getHeadline);

		// Get data from the form.
		const data = {
			email: session.user.email,
			editor: editor,
			headline: getHeadline,
			article: value,
			comments: commentsArray,
			overAllComments: overAllComments,
			id: id,
		};

		// Send the data to the server in JSON format.
		const JSONdata = JSON.stringify(data);

		// API endpoint where we send form data.
		const endpoint = "api/saveEdits";

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

		if (response.ok) {
			// show message and wait for 2 seconds before going back
			setIsError(false);
			setTimeout(() => {
				router.back();
			}, 2000);
		} else {
			setIsError(true);
			// * Add a message displaying that the edits were NOT submitted
			// * before redirecting back to the list
		}
		// 👇️ clear all input values in the form
		// event.target.reset();
		//reload page upon submit
	};

	useEffect(() => {
		// Make sure the router is ready before
		// getting the query parameters
		if (router.isReady) {
			// Get the articles for the current user from the database
			const getArticleRoute = async () => {
				const session = await getSession();
				const id = parseInt(router.query.id);

				if (!isNaN(id)) {
					let endpoint = "api/getArticle";

					// Make sure there is a session before making the API call
					if (session) {
						const data = {
							email: session.user.email,
							id: id,
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
						let result = await response.json();
						let headline = result.headline;
						let article = result.body;
						console.log(
							"🚀 ~ file: commentEditor.js:432 ~ getArticleRoute ~ article:",
							headline
						);
						console.log(
							"🚀 ~ file: commentEditor.js:432 ~ getArticleRoute ~ article:",
							article
						);

						// Make sure the response was received before setting the articles
						if (article) {
							setArticle(article);
						}
						if (headline) {
							setHeadline(headline);
						}
					}
				} else {
				}
			};

			getArticleRoute();
		} else {
		}
		// depend on router.isReady
	}, [router.isReady]);

	const allowedRoles = ["Copy-Editor", "Editor-In-Chief"];

	if (status === "authenticated" && allowedRoles.includes(data.user.role)) {
		return (
			// We pass the event to the handleSubmit() function on submit.
			<Box
				className={styles2.divWriting}
				// sx={{ height: "100vh", backgroundColor: "#303030" }}
				sx={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
				}}
			>
				<Header />

				<br></br>
				<Grid
					container
					sx={{
						display: "flex",
						width: "100%",
						flexDirection: "row",
					}}
				>
					<Grid item sx={{ width: "60%", marginLeft: 2 }}>
						<Button
							size="small"
							sx={{
								backgroundColor: "#5683ED",
								color: "white",
								p: 1,
								marginBottom: 1,
							}}
							onClick={addComment}
						>
							Add Comment
						</Button>
						<Box id="quillEditor">
							<Box
								sx={{
									marginTop: 1,
									backgroundColor: "white",
								}}
							>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										width: "30%",
									}}
								>
									<TextField
										sx={{
											input: {
												color: "black",
											},
											label: {
												color: "black",
											},
											backgroundColor: "white",
											m: 2,
											borderRadius: 1,
											width: "100%",
										}}
										id="headline"
										name="headline"
										label="Headline"
										variant="outlined"
										value={getHeadline}
										onChange={(e) => {
											setHeadline(e.target.value);
										}}
									/>
								</Box>
								<QuillNoSSRWrapper
									id="article"
									modules={articleModules}
									value={value}
									onChange={setValue}
									formats={articleFormats}
									theme="snow"
								/>
								<br></br>
								<br></br>
							</Box>
							<div id="notice" hidden>
								{/* make red */}
								<Typography variant="h3" color="red">
									Please hightlight in the draft
								</Typography>
							</div>
						</Box>
					</Grid>
					<Grid item sx={{ marginLeft: 2 }}>
						<form onSubmit={submit}>
							<Typography
								variant="h4"
								color="white"
								sx={{ m: 1 }}
							>
								Overall Comments
							</Typography>{" "}
							<TextField
								sx={{
									marginLeft: 1,
									marginTop: 0,
									input: {
										color: "black",
										backgroundColor: "white",
										borderRadius: 1,
									},
									flexWrap: "wrap",
									width: "85%",
									backgroundColor: "white",
									borderRadius: 2,
								}}
								multiline
								rows={2}
								maxRows={10}
								variant="filled"
								id="overAllComments"
								name="overAllComments"
							></TextField>
							{/* <textarea style={{m: 1}} id="overAllComments"></textarea> <br></br> */}
							<br></br>
							<Box id="commentsContainer">
								<Typography
									variant="h4"
									sx={{
										margin: 1,
										marginTop: 2,
										color: "white",
									}}
								>
									Comments
								</Typography>
								<Box
									sx={{ marginLeft: 1 }}
									id="currentComments"
								>
									{allComments}
								</Box>
							</Box>
							<Button
								variant="contained"
								type="submit"
								sx={{
									m: 1,
									backgroundColor: "#2bd942",
									color: "white",
								}}
							>
								Submit Edits
							</Button>
						</form>
						{isError === true && (
							<div>
								<Typography
									variant="h4"
									sx={{
										margin: 1,
										marginTop: 2,
										color: "red",
									}}
								>
									There was a problem saving the edits
								</Typography>
							</div>
						)}
						{isError === false && (
							<div>
								<Typography
									variant="h4"
									sx={{
										margin: 1,
										marginTop: 2,
										color: "white",
									}}
								>
									Successfully Saved the Edits
								</Typography>
							</div>
						)}
					</Grid>
				</Grid>
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

export default commentEditor;
