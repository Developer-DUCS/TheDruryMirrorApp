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
//import styles from '../styles/quillTestStyle.css'
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

// Pulled from StackOverflow user "Hitesh Sahu" with modifications
// - TextField component with style
const CssTextField = withStyles({
	root: {
		"& .MuiFilledInput-root": {
			background: "white",
		},
		"& label.Mui-focused": {
			color: "black",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "black",
			backgroundColor: "black",
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "black",
			},
			"&:hover fieldset": {
				borderColor: "black",
			},
			"&.Mui-focused fieldset": {
				borderColor: "black",
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

// Function to load the article in the let editor
// export async function getStaticProps() {
//     console.log("Getting Article");

//     // Get the article (todo: that the user clicked on)
//     const endpoint = "http://localhost:3000/api/getArticle";

//     const options = {
//         // The method is POST because we are sending data.
//         method: "GET",
//         // Tell the server we're sending JSON.
//         headers: {
//             "Content-Type": "application/json",
//         },
//     };

//     // Wait for the article to come back from the database
//     const data = await fetch(endpoint, options);

//     if (data.status == 200) {
//         console.log("recieving article");

//         let article = await data.json();
//         return { props: { article } };
//     }
//     // else {
//     //     console.log("there was an error")
//     //     return { props: "{<p>test</p>}" }
//     // }
// }

let commentId = 0;
let allComments = [];

export function commentEditor() {
	const router = useRouter();

	// Put the article from the api in the left editor and handle the
	// changes that the copy editor makes

	let [value, setValue] = useState();
	const [getArticle, setArticle] = useState([]);
	const { status, data } = useSession();

	// Redirect the user to the
	const redirectToSignIn = (event) => {
		event.preventDefault();
		router.push("/");
	};

	// Handles the submit event from submit edits
	// const handleSubmit = async (event) => {
	//     // Stop the form from submitting and refreshing the page.
	//     event.preventDefault();

	//     // Get data from the form.
	//     const data = {
	//         //first: event.target.first.value,
	//         //last: event.target.last.value,
	//         article: value,
	//     };

	//     // Send the data to the server in JSON format.
	//     console.log(data);
	//     const JSONdata = JSON.stringify(data);
	//     console.log(JSONdata);

	//     // API endpoint where we send form data.
	//     const endpoint = "/api/saveArticle";

	//     // Form the request for sending data to the server.
	//     const options = {
	//         // The method is POST because we are sending data.
	//         method: "POST",
	//         // Tell the server we're sending JSON.
	//         headers: {
	//             "Content-Type": "application/json",
	//         },
	//         // Body of the request is the JSON data we created above.
	//         body: JSONdata,
	//     };

	//     // Send the form data to our forms API on Vercel and get a response.
	//     const response = await fetch(endpoint, options);

	//     // Get the response data from server as JSON.
	//     // If server returns the name submitted, that means the form works.
	//     const result = await response.json();
	// };

	let totalComments = 0;

	const addComment = async (event) => {
		//console.log("pressed add comment button");
		commentId = commentId + 1;
		//console.log(commentId);
		//Grabs the cursor highlighted text
		let comment = window.getSelection().toString();

		let textObj = window.getSelection();

		let test = document.getElementsByClassName("ql-editor")[0].innerHTML;
		
		let testarray = [];
		let testarray2 = [];

		for (let i = 0; i < test.length; i++){
			testarray.push(test[i]);
			testarray2.push(i);
		}
		console.log("testarray", testarray);
		console.log("testarray2", testarray2);

		let stringt = "";
		let tlist = [];
		let clist = [];
		let tstart = value.indexOf(comment);
		let tend = tstart + comment.length;

		for (let i = tstart; i < tend; i++){
			stringt += testarray[i]
			tlist.push(i);
			clist.push(testarray[i]);
		}

		console.log("stringt", stringt);
		console.log("tlist", tlist);
		console.log("clist", clist);

		let ctest = test[0].valueOf();

		let ctest2 = test.indexOf();
		//console.log( ctest2)

		let ztest = test[test.length - 1].valueOf();

		console.log("Article: ", test)
		console.log("start: ", ctest)
		console.log( "end: ", ztest)

		let myRange = window.getSelection().getRangeAt(0);
		// console.log(
		// 	"🚀 ~ file: commentEditor.js:219 ~ addComment ~ myRange",
		// 	myRange
		// );

		let commentStart = myRange.startOffset;
		commentStart = textObj.focusNode.parentElement //grabs the innerHTML
		//let testing  = commentStart.length()
		console.log("CommentStart:", commentStart)

		let commentEnd = myRange.endOffset;
		commentEnd = textObj.focusOffset;

		//The problem with what we were just trying is that it only finds the range of that
		//selected portion of the article. We need to know where in the article that comment is

		//Identifies the index of the beginning of the comment
		let start = value.indexOf(comment);
		//let start = commentStart;

		//empty arrays to fill and compare to check that the highlighted text or is not in the article
		let check = [];
		let com = [];

		//iterates through the article where the comment should be and adds it to an array
		for (let i = start; i < value.length; i++) {
			check.push(value.charAt(i));

			if (i == start + comment.length - 1) {
				console.log(check.toString());
				break;
			}
		}

		//adds the comment into an array
		for (let x = 0; x < comment.length; x++) {
			com.push(comment[x]);
		}
		console.log(com.toString());
		console.log("Start", start);
		let end = start + comment.length;
		//let end = commentEnd;
		console.log("End", end);

		//compares the two arrays to check if highlighted text is in article
		if (
			(value.indexOf(comment) == start) &
			(start + comment.length == end)
		) {
		// if (1 == 1) {
		// 	console.log("Start1", start);
		// 	console.log("End1", start + comment.length, end);
		// 	totalComments += 1;

			// check.toString() === com.toString()

			// ----------------------DECLARE OBJECTS-------------------------- //

			// React.createElement is the equivalent of document.createELement for React components

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
									borderRadius: 1,
								},
							}}
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
						<Typography
							variant="body1"
							sx={{ color: "white", m: 1 }}
						>
							Label
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
						color="secondary"
						sx={{ margin: 2, marginLeft: 0 }}
					>
						Resolve
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

			//
			// allComments.forEach(element => {

			// });
			console.log(box.props.id);
			allComments.push(box);

			//Gets the index of the beginning of the highlighted text
			//var index = value.indexOf(comment);
			var index = tlist[0]

			//index = start + 3; // + 3 cuz of <p>

			//Gets the length of the highlight text
			var range = comment.length;
			range = end - start;

			console.log("Value.length: " + value.length);

			console.log(
				" Starting at index: " +
					index +
					" Length of highlighted comment: " +
					range
			);

			//Adds <span></span> tags to highlight the text in the article
			console.log("Start: ", value.substring(index, index + range + 2));
			console.log("New index:", index)
			// console.log("End: " , value.substring(range))

			// if (index >= 0) {
			// 	// document.getElementsByClassName("ql-editor")[0].innerHTML =
			// 	// 	value.substring(0, index) +
			// 	// 	"<span id=span" +
			// 	// 	commentId +
			// 	// 	' style="background-color: rgb(255, 255, 0); color:black;">' +
			// 	// 	value.substring(index, index + range) +
			// 	// 	"</span>" +
			// 	// 	value.substring(index + range);
			// 	let currArticle =
			// 		document.getElementsByClassName("ql-editor")[0].innerHTML;
			// 	currArticle.innerHTML.indexOf(end) += "</span>";

			// 	currArticle.innerHTML[index] +=
			// 		"<span id=span" +
			// 		commentId +
			// 		' style="background-color: rgb(255, 255, 0); color:black;">';
			// 	// console.log(
			// 	//     "ql-editor: " +
			// 	//         document.getElementsByClassName("ql-editor")[0]
			// 	//             .innerHTML
			// 	// );
			// }
			if (index >= 0) {
				document.getElementsByClassName("ql-editor")[0].innerHTML =
					value.substring(0, index) +
					"<span id=span" +
					commentId +
					' style="background-color: rgb(255, 255, 0); color:black;">' +
					value.substring(index, index + range) +
					"</span>" +
					value.substring(index + range);
				// console.log(
				//     "ql-editor: " +
				//         document.getElementsByClassName("ql-editor")[0]
				//             .innerHTML
				// );
			}
		} else {
			console.log("Notice called");
			let notice = document.getElementById("notice");
			notice.hidden = false;
			await new Promise((r) => setTimeout(r, 3000));
			notice.hidden = true;
		}
	};

	const resolve = async (event) => {
		// document.getElementById(`div ${commentId}`).remove();
		let buttonId = event.target.id;
		console.log(
			"🚀 ~ file: commentEditor.js:360 ~ resolve ~ buttonId",
			buttonId
		);
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
		console.log(
			"🚀 ~ file: commentEditor.js:398 ~ mouseover ~ num",
			num[1]
		);
		if (num[1]) {
			let tempCom = "span";
			let tempComId = tempCom.concat(num[1].toString());
			console.log(
				"🚀 ~ file: commentEditor.js:401 ~ mouseover ~ tempComId",
				tempComId
			);
			console.log("here2");

			if (document.getElementById(tempComId)) {
				document
					.getElementById(tempComId)
					.setAttribute(
						"style",
						"background-color: rgb(0,0,255); color:white;"
					);
			} else {
				console.log("HERE");
			}
		}

		// console.log(document.getElementById(currentCommentID));

		// let spanElement = document.getElementById(currentCommentID);

		// spanElement.setAttribute(
		//     "style",
		//     "background-color: blue; color: white;"
		// );
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
		//let x = event.target.overAllComments.value;
		const id = parseInt(router.query.id);
		let x = event.target.commentTest;
		console.log("🚀 ~ file: commentEditor.js:454 ~ submit ~ x", x);
		let y = x.length;
		let i = 0;
		let commentsArray = [];
		// let overAllComments = x[0].value;
		let overAllComments = event.target.overAllComments.value;
		console.log("OverAllComments:", overAllComments);

		if (y > 0) {
			console.log("here");
			while (y > 0) {
				console.log("here2");

				if (x[i].value != null) {
					console.log("here3");
					console.log("x[i]", x[i].value);

					let com = [x[i].value, x[i].id];
					commentsArray.push(com);
					y = y - 1;
				}
				i = i + 1;
			}
		} else {
			console.log("List was Empty");
		}

		event.preventDefault();
		let session = await getSession();
		let editor = session.user.fname + " " + session.user.lname;
		// console.log(event.target.check)

		// Get data from the form.
		const data = {
			email: session.user.email,
			editor: editor,
			article: value,
			comments: commentsArray,
			overAllComments: overAllComments,
			id: id,
		};

		// Send the data to the server in JSON format.
		console.log(data);
		const JSONdata = JSON.stringify(data);
		console.log(JSONdata);

		// API endpoint where we send form data.
		const endpoint = "/api/saveEdits";

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

		//reload page upon submit
		router.reload();
	};

	const loadArticle = (event) => {
		if (getArticle != []) {
			let article = getArticle;
			console.log(article);
			document.getElementsByClassName("ql-editor")[0].innerHTML = article;
			//value = article
		} else {
		}
	};

	useEffect(() => {
		console.log("here");

		// Get the articles for the current user from the database
		const getArticleRoute = async () => {
			const session = await getSession();
			const id = parseInt(router.query.id);
			console.log(id);
			console.log(id);

			if (!isNaN(id)) {
				let endpoint = "/api/getArticle";

				// Make sure there is a session before making the API call
				if (session) {
					const data = {
						email: session.user.email,
						id: id,
					};
					let JSONdata = JSON.stringify(data);
					console.log("JSONdata", JSONdata);
					let options = {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						// Body of the request is the JSON data we created above.
						body: JSONdata,
					};

					let response = await fetch(endpoint, options);
					let article = await response.json();

					// Make sure the response was recieved before setting the articles
					if (article) {
						setArticle(article);
					}
				}
			} else {
				console.log("id was NaN");
			}
		};

		getArticleRoute();
	}, []);

	const allowedRoles = ["Copy-Editor", "Editor-In-Chief"];

	if (status === "authenticated" && allowedRoles.includes(data.user.role)) {
		return (
			// We pass the event to the handleSubmit() function on submit.
			<Box
				className={styles2.divWriting}
				sx={{ height: "100%", backgroundColor: "#303030" }}
			>
				<Header />
				<Button
					sx={{ marginLeft: 2, marginBottom: 2 }}
					variant="contained"
					color="error"
					onClick={loadArticle}
				>
					Load Article
				</Button>
				<br></br>
				<Grid
					Container
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
								backgroundColor: "white",
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
									backgroundColor: "white",
									marginTop: 1,
								}}
							>
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
					<Grid item sx={{ width: "40%", marginLeft: 2 }}>
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
										background: "white",
										borderRadius: 1,
									},
								}}
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
								<div id="currentComments">{allComments}</div>
							</Box>
							<Button
								color="error"
								variant="contained"
								type="submit"
								// onClick={() => {
								//     submit;
								// }}
								sx={{ m: 1 }}
							>
								Submit Edits
							</Button>
						</form>
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
