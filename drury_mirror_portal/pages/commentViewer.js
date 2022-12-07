import "react-quill/dist/quill.snow.css";
import styles from "../styles/article.module.css";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSession, signOut, getSession } from "next-auth/react";

import React, { useState, useEffect } from "react";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

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

        console.log(value);

        event.preventDefault();
        let session = await getSession();
        //let editor = session.user.fname + " " + session.user.lname;
        // console.log(event.target.check)

        // Get data from the form.
        const data = {
            article: value,
            id: id,
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

    const loadArticle = (event) => {
        if (getArticle != []) {
            let article = getArticle;
            let comments = getComments;
            document.getElementById("overallComments").innerHTML +=
                comments.overallComments;
            comments = comments.comments.split(",");
            console.log(article);
            document.getElementsByClassName("ql-editor")[0].innerHTML = article;
            console.log(comments);

            let commentsArray = [];
            let inputArray = [];
            for (let i = 0; i < comments.length; i++) {
                if (i % 2 == 0) {
                    console.log(i);
                    commentsArray.push(comments[i]);
                    console.log("comments array", commentsArray[i]);
                } else {
                    inputArray.push(comments[i]);
                }
            }
            document.getElementById("comments").innerHTML += commentsArray;

            // var label = document.createElement("label");
            // label.innerHTML = comments;
            //value = article
        } else {
        }
    };

    useEffect(() => {
        // if (router.isReady) {
        // Get the articles for the current user from the database
        console.log("Use effect running");
        const getArticleRoute = async () => {
            const session = await getSession();
            const id = parseInt(router.query.id);
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
                    let comments = await response.json();

                    // Make sure the response was recieved before setting the articles
                    if (comments) {
                        setComments(comments);
                    }
                }
            } else {
                console.log("id was NaN");
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
                <button onClick={() => signOut()}>Log Out</button>
                <button onClick={loadArticle}>Load Article</button>

                <div className={styles.editorDiv}>
                    <div id="quillEditor" className={styles.Editor}>
                        <br></br>
                        <br></br>
                        <form onSubmit={submit}>
                            <QuillNoSSRWrapper
                                id="article"
                                modules={articleModules}
                                value={value}
                                onChange={setValue}
                                formats={articleFormats}
                                theme="snow"
                            />
                            <label>
                                {/* Maybe explain better */}
                                Check this box if the article is ready to be
                                edited, if you want to come back to this
                                article, leave the box un-checked
                            </label>
                            <input id="checkbox" type="checkbox"></input>
                            <button type="submit">Save Edits</button>
                        </form>
                        <p id="overallComments">overallComments: </p>
                        <p id="comments">comments: </p>
                        <br></br>
                        <br></br>

                        <div id="notice" hidden>
                            {/* make red */}
                            <label>Please hightlight in the draft</label>
                        </div>
                    </div>
                </div>
            </>
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

export default CommentViewer;
