//import styles from '../styles/quillTestStyle.css'
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import styles from "../styles/article.module.css";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSession, signOut, getSession } from "next-auth/react";

//import parse from 'html-react-parser';

// we import react-quill dynamically, to avoid including it in server-side
// and we will render a loading state while the dynamic component is being loaded.
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

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
    // Handles the contents of the article editor.
    let [value, setValue] = useState();
    const [getArticle, setArticle] = useState([]);
    const { status, data } = useSession();

    // Handles the submit event on form submit.

    const router = useRouter();

    // Redirect the user to the
    const redirectToSignIn = (event) => {
        event.preventDefault();
        router.push("/");
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

    // Populate the articles array to display the articles on the page
    //   let articles = []
    //   function filterArticles() {
    //     // if not default value (meaning it has data)
    //     if (getArticles != []) {
    //       getArticles.forEach(checkArticle)
    //     }
    //   }

    //   // Check if the article exists
    //   function checkArticle(article) {
    //     if (article) { articles.push(article) }
    //   }

    //   filterArticles();

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        console.log(value);
        event.preventDefault();
        let session = await getSession();
        let author = session.user.fname + " " + session.user.lname;
        // console.log(event.target.check)

        // Get data from the form.
        const data = {
            email: session.user.email,
            author: author,
            article: value,
            check: document.getElementById("checkbox").checked,
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
            console.log(article);
            document.getElementsByClassName("ql-editor")[0].innerHTML = article;
            //value = article
        } else {
        }
    };

    if (status === "authenticated") {
        return (
            // We pass the event to the handleSubmit() function on submit.
            <>
                <h1>
                    Welcome {data.user.fname} {data.user.lname} <br></br>
                </h1>
                <button onClick={loadArticle}>Load Article</button>
                <button
                    className={styles.draftButton}
                    onClick={() => signOut()}
                >
                    Log Out
                </button>
                <form onSubmit={handleSubmit}>
                    <QuillNoSSRWrapper
                        id="article"
                        modules={modules}
                        value={value}
                        onChange={setValue}
                        formats={formats}
                        theme="snow"
                    />
                    <br></br>
                    <br></br>
                    <label>
                        {/* Maybe explain better */}
                        Check this box if the article is ready to be edited, if
                        you want to come back to this article, leave the box
                        un-checked
                    </label>
                    <input id="checkbox" type="checkbox"></input>

                    <button type="submit">Save Article</button>
                </form>

                <div>
                    <p>{value}</p>
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
