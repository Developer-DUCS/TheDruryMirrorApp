// Editor
//import styles from '../styles/quillTestStyle.css'
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import styles from "../styles/article.module.css";

import { useRouter } from "next/router";
import {
	Button,
	Container,
	TextField,
	Box,
	Stack,
	Grid,
	Typography,
	Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

// React, Next, system stuff
import React, { useState, useEffect } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";

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
    const [getImageData, setImageData] = useState("");
    const [getImageType, setImageType] = useState("");
    const { status, data } = useSession();

	// Used to set the text on the submit button
	const [buttonText, setButtonText] = useState("Save as Draft");

	const router = useRouter();

	// Redirect the user to the
	const redirectToSignIn = (event) => {
		event.preventDefault();
		router.push("/");
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
			console.log("Error");
		}
	};

	// loads the article into the editor
	useEffect(() => {
		if (getArticle != []) {
			let myArticle = getArticle;

			//myArticle = myArticle.toString();

			setValue(myArticle);
		}
	}, [getArticle]);
        

	const handleSubmit = async (event) => {
		// Stop the form from submitting and refreshing the page.
		console.log(value);
		event.preventDefault();

		let session = await getSession();
		let author = session.user.fname + " " + session.user.lname;
		// console.log(event.target.check)

		// Get data from the form.

		// if (router.query.id) {
		// 	const data = {
		// 		email: session.user.email,
		// 		author: author,
		// 		article: value,
		// 		check: document.getElementById("checkbox").checked,
		// 		aid: router.query.id,
		// 	};
		if (router.query.id) {
            const data = {
                email: session.user.email,
                author: author,
                article: value,
                check: document.getElementById("checkbox").checked,
                aid: router.query.id,
                imageType: getImageType,
                imageData: getImageData,
            };

			// Send the data to the server in JSON format.
			console.log(data);
			const JSONdata = JSON.stringify(data);
			console.log(JSONdata);

			// API endpoint where we send form data.
			const endpoint = "/api/saveArticle";

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
			// const data = {
			// 	email: session.user.email,
			// 	author: author,
			// 	article: value,
			// 	check: document.getElementById("checkbox").checked,
			// };
			const data = {
                email: session.user.email,
                author: author,
                article: value,
                check: document.getElementById("checkbox").checked,
                imageData: getImageData,
                imageType: getImageType,
            };

			// Send the data to the server in JSON format.
			console.log(data);
			const JSONdata = JSON.stringify(data);
			console.log(JSONdata);

			// API endpoint where we send form data.
			const endpoint = "/api/saveArticle";

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
		router.reload();
	};

	useEffect(() => {
		console.log("here");

		// Make sure the router is ready before
		// getting the query parameters
		if (router.isReady) {
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
		} else {
			console.log("Error here");
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
            const file = event.target.files[0]
            
            var reader = new FileReader();
            
            reader.onloadend = function () {
                console.log("RESULT", file.type);
                setImageData(reader.result);
                setImageType(file.type);
                console.log("🚀 ~ file: articleWriting.js:131 ~ fileInput.addEventListener ~ getImageType", getImageType)
            };
                console.log("🚀 ~ file: articleWriting.js:259 ~ fileInput.addEventListener ~ setImageData:", getImageData);

            reader.readAsDataURL(file);
        });
    }

	if (status === "authenticated") {
		return (
			<>
				<div className={styles.divWriting}>
					<div>
						<Header />
					</div>
					<form onSubmit={handleSubmit}>
					<Button
                            sx={{ m: 2 }}
                            variant="contained"
                            color="error"
                            onClick={() => { uploadFileHandler(); }}
                            startIcon={<DriveFolderUploadIcon/>}
                        >
                            Upload Thumbnail
                        </Button>
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
									color="error"
									onChange={switchReadyForEdits}
									sx={{
										color: "white",
										marginTop: -1,
										marginLeft: 1,
										borderColor: "white",
									}}
								/>
							</Grid>
						</Grid>
						{/* <input id="checkbox" type="checkbox"></input> */}

						<Button
							sx={{
								m: 2,
							}}
							color="error"
							variant="contained"
							type="submit"
						>
							{buttonText}
						</Button>
					</form>
				</div>
			</>
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
