// Article Writing
// Page Description:
//                 The writing page for articles, before comments, etc.
//
//Creation Date:
//                  By: Haley Saylor
//
//Modificaiton Log:
//

// Editor
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import styles from "../styles/article.module.css";

import { useRouter } from "next/router";
import {
	Button,
	Box,
	Stack,
	Grid,
	Typography,
	Checkbox,
	TextField,
} from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

// React, Next, system stuff
import React, { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";

// Components
import Header from "./header";

// we import react-quill dynamically, to avoid including it in server-side
// and we will render a loading state while the dynamic component is being loaded.
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});

// Modules, options, etc. for the editor
const modules = {
	toolbar: [
		[{ header: "1" }, { header: "2" }, { font: [] }],
		[{ size: [] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[{ color: [] }, { background: [] }],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image", "video"],
		["clean"],
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
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"color",
	"background",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
	"video",
];

export default function articleWriting() {
	// Handles the contents of the article editor
	let [value, setValue] = useState();
	const [getArticle, setArticle] = useState([]);
	const [getHeadline, setHeadline] = useState([]);
	const [getImageData, setImageData] = useState("");
	const [getImageType, setImageType] = useState("");
	const { status, data } = useSession();

	// Used to set the text on the submit button
	const [buttonText, setButtonText] = useState("Save as Draft");

	const router = useRouter();

	// Redirect the user to the
	const redirectToSignIn = (event) => {
		event.preventDefault();
		router.push(`${process.env.NEXT_PUBLIC_API_PATH}/`);
	};

	// Switch the text on the submit button when the user clicks
	// the checkbox
	const switchReadyForEdits = () => {
		let checkValue = document.getElementById("checkbox").checked;
		if (!checkValue) {
			setButtonText("Save as Draft");
		} else if (checkValue) {
			setButtonText("Submit");
		} else {
		}
	};

	// loads the article into the editor
	useEffect(() => {
		if (getArticle != []) {
			let myArticle = getArticle;
			setValue(myArticle);
		}
	}, [getArticle]);

	const handleSubmit = async (event) => {
		// Stop the form from submitting and refreshing the page.
		event.preventDefault();

		let session = await getSession();
		let author = session.user.fname + " " + session.user.lname;

		if (router.query.id) {
			const data = {
				email: session.user.email,
				author: author,
				headline: event.target.headline.value,
				article: value,
				check: document.getElementById("checkbox").checked,
				aid: router.query.id,
				imageType: getImageType,
				imageData: getImageData,
			};

			// Send the data to the server in JSON format.
			const JSONdata = JSON.stringify(data);

			// API endpoint where we send form data.
			const endpoint = "api/saveArticle";

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
		} else {
			const data = {
				email: session.user.email,
				author: author,
				headline: event.target.headline.value,
				article: value,
				check: document.getElementById("checkbox").checked,
				imageData: getImageData,
				imageType: getImageType,
			};

			// Send the data to the server in JSON format.
			const JSONdata = JSON.stringify(data);

			// API endpoint where we send form data.
			const endpoint = "api/saveArticle";

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
		}

		// reload page upon submit
		router.back();
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

	// UploadFileHandler()
	// - Converts the file uploaded into base 64
	function uploadFileHandler() {
		// Open a file explorer for a user that only accepts image files
		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*";
		fileInput.click();

		// When the user selects an image, send the image to the server using the uploadHandler API endpoint
		fileInput.addEventListener("change", async (event) => {
			// 1. Convert file into base64 object
			const file = event.target.files[0];

			var reader = new FileReader();

			reader.onloadend = function () {
				setImageData(reader.result);
				setImageType(file.type);
			};
			reader.readAsDataURL(file);
		});
	}

	if (status === "authenticated") {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
				}}
			>
				<Box
					className={styles.divWriting}
					sx={{
						display: "flex",
						flexDirection: "column",
						minHeight: "100vh",
					}}
				>
					<div>
						<Header />
					</div>
					<form onSubmit={handleSubmit}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								width: "30%",
							}}
						>
							{/* <Button
								sx={{ m: 2 }}
								variant="contained"
								color="error"
								onClick={() => {
									uploadFileHandler();
								}}
								startIcon={<DriveFolderUploadIcon />}
							>
								Upload Thumbnail
							</Button> */}
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

						<Box
							sx={{
								backgroundColor: "white",
								margin: 2,
							}}
						>
							<QuillNoSSRWrapper
								id="article"
								modules={modules}
								value={value}
								onChange={setValue}
								formats={formats}
								theme="snow"
							/>
						</Box>
						<br></br>
						<br></br>
						<Grid
							container
							sx={{ display: "flex", flexDirection: "row" }}
						>
							<Grid item>
								<Typography
									sx={{ color: "white", marginLeft: 2 }}
								>
									{/* Maybe explain better */}
									Ready for Edits
								</Typography>
							</Grid>
							<Grid item>
								<Checkbox
									id="checkbox"
									onChange={switchReadyForEdits}
									sx={{
										color: "white",
										marginTop: -1,
										marginLeft: 1,
										borderColor: "white",
										input: {
											backgroundColor: "#2bd942",
										},
									}}
								/>
							</Grid>
						</Grid>
						<Button
							sx={{
								m: 2,
								backgroundColor: "#2bd942",
								color: "white",
							}}
							variant="contained"
							type="submit"
						>
							{buttonText}
						</Button>
					</form>
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
