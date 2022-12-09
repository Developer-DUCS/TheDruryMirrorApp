//import styles from '../styles/quillTestStyle.css'
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import styles from "../styles/article.module.css";

import { useRouter } from "next/router";
import { Button, Container, TextField, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

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

    const router = useRouter();

    // Redirect the user to the
    const redirectToSignIn = (event) => {
        event.preventDefault();
        router.push("/");
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

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        console.log(value);
        event.preventDefault();

        let session = await getSession();
        let author = session.user.fname + " " + session.user.lname;
        // console.log(event.target.check)

        // Get data from the form.

        if (router.query.id) {
            const data = {
                email: session.user.email,
                author: author,
                article: value,
                check: document.getElementById("checkbox").checked,
                aid: router.query.id,
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
            <>
                <div className={styles.divWriting}>
                    <div>
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
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Container>
                            <TextField
                                variant="filled"
                                size="small"
                                label="First Name"
                                id="first"
                                name="first"
                                sx={{
                                    input: {
                                        color: "white",
                                    },
                                    label: {
                                        color: "white",
                                    },
                                    marginLeft: -1,
                                }}
                                required
                            />
                            <TextField
                                variant="filled"
                                size="small"
                                label="Last Name"
                                id="last"
                                name="last"
                                sx={{
                                    input: {
                                        color: "white",
                                    },
                                    label: {
                                        color: "white",
                                    },
                                }}
                                required
                            />
                        </Container>
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
                        <label>
                            {/* Maybe explain better */}
                            Check this box if the article is ready to be edited,
                            if you want to come back to this article, leave the
                            box un-checked
                        </label>
                        <input id="checkbox" type="checkbox"></input>

                        <Button
                            sx={{
                                marginLeft: 2,
                            }}
                            color="error"
                            variant="contained"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </form>
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

// export default function Home() {
//     return (
//         <>
//             <div>
//                 <div className="px-6 py-4">
//                     <form id="textEditor" action="#" method="post">
//                         <label htmlFor="first">First name:</label><br></br>
//                         <input type="text" id="first" name="first" /><br></br>
//                         <label htmlFor="last">Last name:</label><br></br>
//                         <input type="text" id="last" name="last" /><br></br>
//                         <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" />
//                         <button type="submit">Submit</button>
//                     </form>
//                 </div>
//             </div>

//         </>
//     )
// }
