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
                        "background-color: rgb(0,0,255); color:black;"
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

    if (status === "authenticated") {
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
                    onClick={() => signOut()}
                >
                    Log Out
                </Button>
                <Button
                    sx={{
                        position: "absolute",
                        right: 25,
                        top: 25,
                    }}
                    variant="contained"
                    color="error"
                    onClick={loadArticle}
                >
                    Load Article
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
                            name="overAllComments"
                        ></TextField>
                        {/* <textarea style={{m: 1}} id="overAllComments"></textarea> <br></br> */}
                        <br></br>
                        <Box id="commentsContainer">
                            <Typography
                                variant="h4"
                                sx={{ margin: 1, marginTop: 2, color: "white" }}
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
                </div>
            </Box>
        );
    } else {
        return (
            <>
                <p>Please sign in</p>
                <button onClick={redirectToSignIn}>Sign In</button>
            </>
        );
    }
}

export default commentEditor;
