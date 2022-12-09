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
import { Button, Container, TextField, Box, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";

// React and Next imports
import React, { useState, Component } from "react";
import { ReactDOM } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { createRoot, hydrateRoot } from "react-dom/client";

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
export async function getStaticProps() {
    console.log("Getting Article");

    // Get the article (todo: that the user clicked on)
    const endpoint = "http://localhost:3000/api/getArticle";

    const options = {
        // The method is POST because we are sending data.
        method: "GET",
        // Tell the server we're sending JSON.
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Wait for the article to come back from the database
    const data = await fetch(endpoint, options);

    if (data.status == 200) {
        console.log("recieving article");

        let article = await data.json();
        return { props: { article } };
    }
    // else {
    //     console.log("there was an error")
    //     return { props: "{<p>test</p>}" }
    // }
}

let commentId = 0;
let allComments =[]

export function PageWithJSbasedForm({ article }) {
    const router = useRouter();

    // Put the article from the api in the left editor and handle the
    // changes that the copy editor makes

    let [value = article, setValue] = useState();

    // Handle the log out button
    const logOut = async (event) => {
        router.push("/");
    };

    // Handles the submit event from submit edits
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        // Get data from the form.
        const data = {
            //first: event.target.first.value,
            //last: event.target.last.value,
            article: value,
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
    };

    const addComment = async (event) => {
        console.log("pressed button");
        commentId = commentId + 1;
        console.log(commentId);
        //Grabs the cursor highlighted text
        var comment = window.getSelection().toString();

        //Identifies the index of the beginning of the comment
        let start = value.indexOf(comment);

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

        //compares the two arrays to check if highlighted text is in article
        if (check.toString() === com.toString()) {
            // ----------------------DECLARE OBJECTS-------------------------- //

            // React.createElement is the equivalent of document.createELement for React components

            const styledCommentBox = () => {
                return (
                    <>
                        <CssTextField
                            onMouseEnter={mouseover}
                            onMouseLeave={mouseleave}
                            variant="filled"
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
                id: `input ${commentId}`,
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
                        onClick={() => {
                            resolve();
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
            var button = React.createElement(styledButton, {
                id: `button ${commentId}`,
            });

            // Box containing each component generated from "Add Comment" button
            // - each component is rendered whenever the box is rendered because they are children of the box
            var box = React.createElement(
                Box,
                {
                    id: `div ${commentId}`,
                },
                label,
                commentBox,
                button
            );

            // ----------------------RENDER OBJECTS-------------------------- //
            const rootID = document.getElementById("currentComments");
            const root = createRoot(rootID);
            
            allComments.push(box)
            root.render(allComments)

            allComments.reverse();

            // for(let i = 0; i < allComments.length; i++)
            // {

            // }
            
            //hydrateRoot(root)

            //const commentsList = document.getElementById("commentsList");


            // root.render(box);
            
            // rootID.append(box);


            // rootID.append(label, commentBox, button);

            //Gets the index of the beginning of the highlighted text
            var index = value.indexOf(comment);

            //Gets the length of the highlight text
            var range = comment.length;

            console.log(
                " Starting at index: " +
                    index +
                    " Length of highlighted comment: " +
                    range
            );

            //Adds <span></span> tags to highlight the text in the article
            if (index >= 0) {
                document.getElementsByClassName("ql-editor")[0].innerHTML =
                    value.substring(0, index) +
                    "<span id=span" +
                    commentId +
                    ' style="background-color: rgb(255, 255, 0); color:black;">' +
                    value.substring(index, index + range) +
                    "</span>" +
                    value.substring(index + range);
                console.log(
                    "ql-editor: " +
                        document.getElementsByClassName("ql-editor")[0]
                            .innerHTML
                );
            }

        } else {
            let notice = document.getElementById("notice");
            notice.hidden = false;
            await new Promise((r) => setTimeout(r, 3000));
            notice.hidden = true;
        }
    };

    const resolve = async (event) => {
        document.getElementById(`div ${commentId}`).remove();
        let currentCommentID = "span" + commentId;
        let spanElement = document.getElementById(currentCommentID);

        spanElement.removeAttribute("style", "background-color: yellow");
    };

    const mouseover = async (event) => {
        let currentCommentID = "span" + commentId;

        console.log(document.getElementById(currentCommentID));

        let spanElement = document.getElementById(currentCommentID);

        spanElement.setAttribute(
            "style",
            "background-color: blue; color: white;"
        );
    };

    const mouseleave = async (event) => {
        let currentCommentID = "span" + commentId;

        console.log(document.getElementById(currentCommentID));

        let spanElement = document.getElementById(currentCommentID);

        spanElement.setAttribute(
            "style",
            "background-color: rgb(255,255,0); color:black;"
        );
    };

    const submit = (event) => {
        event.preventDefault();
        let x = event.target.getElementsByTagName("textarea");
        let y = x.length;
        let i = 1;
        let commentsArray = [];
        let overAllComments = x[0].value;
        console.log("OverAllComments:", overAllComments);

        if (y > 1) {
            while (y > 1) {
                if (x[i].value != null) {
                    let com = [x[i].value, x[i].id];
                    commentsArray.push(com);
                    y = y - 1;
                }
                i = i + 1;
            }
        } else {
            console.log("List was Empty");
        }

        console.log(commentsArray);
    };

    return (
        // We pass the event to the handleSubmit() function on submit.
        <Box className={styles2.divWriting} sx={{ height: "100%" }}>
            <Button
                sx={{
                    position: "absolute",
                    right: 35,
                    top: 25,
                }}
                variant="contained"
                color="error"
                onClick={logOut}
            >
                Log Out
            </Button>

            <div id="quillEditor" className={styles.Editor}>
                <Button
                    size="small"
                    sx={{
                        backgroundColor: "white",
                        p: 1,
                    }}
                    onClick={addComment}
                >
                    Add Comment
                </Button>

                <br></br>
                <br></br>
                <Box
                    sx={{
                        backgroundColor: "white",
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
                    <text>Please hightlight in the draft</text>
                </div>
            </div>

            <div className={styles.comments}>
                <form onSubmit={submit}>
                    <Typography variant="h4" color="white" sx={{ m: 1 }}>
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
                    ></TextField>
                    {/* <textarea style={{m: 1}} id="overAllComments"></textarea> <br></br> */}
                    <br></br>
                    <Button
                        color="error"
                        variant="contained"
                        type="submit"
                        onClick={() => {
                            handleSubmit;
                        }}
                        sx={{ m: 1 }}
                    >
                        Submit Edits
                    </Button>
                    <Box id="commentsContainer">
                        <Typography
                            variant="h4"
                            sx={{ margin: 1, marginTop: 2 }}
                        >
                            Comments
                        </Typography>
                        <div id="currentComments">
                            {allComments}
                        </div>
                    </Box>
                </form>
            </div>
        </Box>
    );
}

export default PageWithJSbasedForm;
