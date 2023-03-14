// commentViewer.js
// Page Description:
//                  Page for Writer to see the edits and commons that a Copy Editor has made on their drafts.
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Dec. 1 2022
//
//Modificaiton Log:
//                  !!!!ADD COMMENT BUG: CANT HANDLE A SINGLE HIGHLIGHTED SPACE IN THE TEXT!!!!
//                  !!!!ADD COMMENT BUG: CAN'T COMMENT OVER AN EXIST COMMENT!!!!
//                  !!!!RESOLVE BUG: REMOVING HIGHLIGHTED WORDS IN THE ARTICLE AND THE TRYING TO RESOLVE THROWS ERROR!!!!
//                  TODO:: FIX NAMING CONVENTIONS
//
//

import "react-quill/dist/quill.snow.css";
import styles from "../styles/article.module.css";
import styles2 from "../styles/article.module.css";

import {
    Button,
    Container,
    TextField,
    Box,
    Typography,
    Stack,
    Grid,
    Checkbox,
} from "@mui/material";

import { withStyles } from "@mui/styles";
import { createRoot, hydrateRoot } from "react-dom/client";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSession, signOut, getSession } from "next-auth/react";

import React, { useState, useEffect } from "react";
import { getElementById } from "domutils";

import Header from "./header";

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
            color: "white",
        },
        "& .MuiInput-underline:after": {
            borderBottomcolor: "white",
            backgroundcolor: "white",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                bordercolor: "white",
            },
            "&:hover fieldset": {
                bordercolor: "white",
            },
            "&.Mui-focused fieldset": {
                bordercolor: "white",
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

export function CommentViewer() {
    let [value, setValue] = useState();
    const [getArticle, setArticle] = useState([]);
    const [getComments, setComments] = useState([]);
    const { status, data } = useSession();
    const router = useRouter();

    // Redirect the user to the log in screen
    const redirectToSignIn = (event) => {
        event.preventDefault();
        router.push("/");
    };

    const submit = async (event) => {
        event.preventDefault();
        const id = parseInt(router.query.id);

        event.preventDefault();
        let session = await getSession();
        //let editor = session.user.fname + " " + session.user.lname;
        // console.log(event.target.check)

        // Get data from the form.
        const data = {
            article: value,
            id: id,
            page: "commentViewer",
            checked: document.getElementById("checkbox").checked,
        };

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

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

        //reload the page after submit
        router.reload();
    };

    const loadArticle = (event) => {
        if (getArticle != []) {
            let article = getArticle;
            let comments = getComments;
            console.log(
                "🚀 ~ file: commentViewer.js:173 ~ loadArticle ~ comments",
                comments
            );

            // var overall = document.createElement("textarea");
            // overall.setAttribute("readonly", true);
            // overall.innerHTML = comments.overallComments;
            // document.getElementById("overallComments").append(overall);
            document.getElementById("overAllComments").value =
                comments.overallComments;
            comments = comments.comments.split(",");
            // console.log(article);
            document.getElementsByClassName("ql-editor")[0].innerHTML = article;

            let commentsArray = [];
            let inputArray = [];
            for (let i = 0; i < comments.length; i++) {
                if (i % 2 == 0) {
                    commentsArray.push(comments[i]);
                } else {
                    inputArray.push(comments[i]);
                }
            }
            for (let y = 0; y < commentsArray.length; y++) {
                let tempid = inputArray[y];
                let idnum = tempid.split("t");
                console.log("comment: ", commentsArray[y]);
                const styledCommentBox = () => {
                    return (
                        <>
                            <CssTextField
                                id={`input${idnum[1]}`}
                                onMouseEnter={mouseover}
                                onMouseLeave={mouseleave}
                                variant="filled"
                                name="commentTest"
                                value={commentsArray[y]}
                                // input.innerHTML = commentsArray[y];
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
                    id: `label ${idnum[1]}`,
                });

                // Stateless functional component button used for "resolve"
                const styledButton = () => {
                    return (
                        <Button
                            id={`button${idnum[1]}`}
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
                        id: `div${idnum[1]}`,
                    },
                    label,
                    commentBox,
                    button
                );

                // ----------------------RENDER OBJECTS-------------------------- //
                allComments.push(box);

                const rootID = document.getElementById("currentComments");

                // const root = createRoot(rootID);
                //render(rootID);

                //
                // allComments.forEach(element => {

                // });
                console.log(box.props.id);
            }
        } else {
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
        try {
            let inputId = event.target.id;
            console.log(
                "🚀 ~ file: commentViewer.js:377 ~ mouseleave ~ inputId",
                inputId
            );

            let num = inputId.split("t");
            if (num[1]) {
                let tempCom = "span";

                let tempComId = tempCom.concat(num[1].toString());

                if (document.getElementById(tempComId)) {
                    document
                        .getElementById(tempComId)
                        .setAttribute(
                            "style",
                            "background-color: rgb(255,255,0); color:black;"
                        );
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // if (router.isReady) {
        // Get the articles for the current user from the database
        console.log("Use effect running");
        const getArticleRoute = async () => {
            const session = await getSession();
            const id = parseInt(router.query.id);

            if (!isNaN(id)) {
                let endpoint = "/api/getArticle";

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
                    let article = await response.json();

                    // Make sure the response was recieved before setting the articles
                    if (article) {
                        setArticle(article);
                    }
                }
            } else {
            }
        };

        const getCommentsRoute = async () => {
            const session = await getSession();
            const id = parseInt(router.query.id);

            if (!isNaN(id)) {
                let endpoint = "/api/getComments";

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
                    let comments = await response.json();

                    // Make sure the response was recieved before setting the articles
                    if (comments) {
                        setComments(comments);
                    }
                }
            } else {
            }
        };
        getArticleRoute();
        getCommentsRoute();
        // } else {
        //     console.log("Not ready yet");
        // }
    }, []); //router.isReady

    if (status === "authenticated") {
        return (
            <>
                <Header />
                <Button
                    sx={{ marginLeft: 0, marginBottom: 3 }}
                    variant="contained"
                    color="error"
                    onClick={loadArticle}
                >
                    Load Article
                </Button>
                <Grid
                    Container
                    sx={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                    }}
                >
                    <Grid item sx={{ width: "60%", marginLeft: 2 }}>
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
                                <text>Please hightlight in the draft</text>
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
                            <Grid item>
                                <Checkbox
                                    id="checkbox"
                                    color="error"
                                    sx={{
                                        color: "white",
                                        marginTop: -1,
                                        marginLeft: 1,
                                        borderColor: "white",
                                    }}
                                />
                            </Grid>
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
            </>
        );
        {
            /* <div className={styles.comments}>
                    
                    <form onSubmit={submit}>
                        <div id="quillEditor" className={styles.Editor}>
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
                        </div>
                        <Grid
                            container
                            sx={{
                                marginTop: 4,
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Grid item>
                                <Typography
                                    sx={{ color: "white", marginLeft: 1 }}
                                >
                                    {/* Maybe explain better */
        }
        // Ready for Edits
        //                 </Typography>
        //             </Grid>
        //             <Grid item>
        //                 <Checkbox
        //                     id="checkbox"
        //                     color="error"
        //                     sx={{
        //                         color: "white",
        //                         marginTop: -1,
        //                         marginLeft: 1,
        //                         bordercolor: "white",
        //                     }}
        //                 />
        //             </Grid>
        //         </Grid>
        //         <Typography
        //             variant="h4"
        //             color="white"
        //             sx={{ m: 1, marginTop: 2 }}
        //         >
        //             Overall Comments
        //         </Typography>{" "}
        //         <TextField
        //             sx={{
        //                 marginLeft: 1,
        //                 marginTop: 0,
        //                 input: {
        //                     color: "black",
        //                     background: "white",
        //                     borderRadius: 1,
        //                 },
        //             }}
        //             variant="filled"
        //             id="overAllComments"
        //             name="overAllComments"
        //             aria-readonly
        //         ></TextField>
        //         {/* <textarea style={{m: 1}} id="overAllComments"></textarea> <br></br> */}
        //         <br></br>
        //         <Box id="commentsContainer">
        //             <Typography
        //                 variant="h4"
        //                 sx={{ margin: 1, marginTop: 2, color: "white" }}
        //             >
        //                 Comments
        //             </Typography>
        //             <div id="currentComments">{allComments}</div>
        //         </Box>
        //         <Button
        //             color="error"
        //             variant="contained"
        //             type="submit"
        //             // onClick={() => {
        //             //     submit;
        //             // }}
        //             sx={{ m: 1 }}
        //         >
        //             Submit Edits
        //         </Button>
        //     </form>
        // </div> */}

        // );
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

export default CommentViewer;
