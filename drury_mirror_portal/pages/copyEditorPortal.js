//Page Description:
//                  Landing page for the copy editor after they log in to the site
//Creation Date:
//                  By: Thomas Nield  Oct. 4 2022
//
//Modificaiton Log:
//
// 12/03 - Thomas O. standardized the styling on this page to match the other portals' styling
//

import styles from "../styles/article.module.css";

import {
    TextField,
    Button,
    FormGroup,
    Grid,
    Typography,
    Card,
    Toolbar,
} from "@mui/material";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession, signOut, getSession } from "next-auth/react";

//Populates the page
export function copyEditorPortal() {
    const parse = require("html-react-parser");
    const router = useRouter();
    const { status, data } = useSession();
    const [getArticles, setArticles] = useState([]);

    // Redirect the user to the log in screen
    const redirectToSignIn = (event) => {
        event.preventDefault();
        router.push("/");
    };

    // Handle the edit article button
    const editArticleRoute = async (event) => {
        event.preventDefault();
        console.log("article id: ", event.currentTarget.id);
        router.push({
            pathname: "commentEditor",
            query: { id: event.currentTarget.id },
        });
    };

    // Handle the write draft button
    const writeDraftRoute = async (event) => {
        router.push("articleWriting");
    };

    const readyToPublish = async (event) => {
        event.preventDefault();
        console.log("article id: ", event.currentTarget.id);
        // Get data from the form.
        const data = {
            id: event.currentTarget.id,
            page: "copyEditorPortal",
        };

        // Send the data to the server in JSON format.
        console.log(data);
        const JSONdata = JSON.stringify(data);
        console.log(JSONdata);

        // API endpoint where we send form data.
        const endpoint = "/api/publishArticle";

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

    useEffect(() => {
        // Get the articles for the current user from the database
        const getArticlesRoute = async () => {
            const session = await getSession();

            let endpoint = "/api/getArticles";

            // Make sure there is a session before making the API call
            if (session) {
                let data = {
                    email: session.user.email,
                    page: "copyEditorPortal",
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
                if (response.status != 200) {
                    console.log(response.status);
                    console.log(response.statusText);
                } else {
                    let articles = await response.json();
                    console.log(
                        "🚀 ~ file: copyEditorPortal.js:68 ~ getArticlesRoute ~ articles",
                        articles
                    );

                    // Make sure the response was recieved before setting the articles
                    if (articles) {
                        setArticles(articles);
                    }
                }
            }
        };

        getArticlesRoute();
    }, []);

    // Populate the articles array to display the articles on the page
    let articles = [];
    function filterArticles() {
        // if not default value (meaning it has data)
        if (getArticles != []) {
            getArticles.forEach(checkArticle);
        }
    }

    // Check if the article exists
    function checkArticle(article) {
        if (article) {
            articles.push(article);
        }
    }
    filterArticles();
    console.log("aritcle 1:", articles[0]);

    if (status === "authenticated") {
        return (
            <>
                <Toolbar sx={{ marginTop: "10px" }}>
                    <Typography variant="h2" sx={{ flexGrow: 5 }}>
                        Drury Mirror
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            marginRight: 3,
                            color: "white",
                            backgroundColor: "#4685F5",
                        }}
                        onClick={writeDraftRoute}
                    >
                        Write Draft
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => signOut()}
                    >
                        Log Out
                    </Button>
                </Toolbar>

                <Typography variant="h2" sx={{ marginLeft: 3 }}>
                    Article List
                </Typography>
                <div>
                    {articles.map((article) => (
                        <Card
                            style={{
                                backgroundColor: "#41414B",
                                margin: 15,
                                padding: 5,
                                paddingLeft: 15,
                                boxShadow: 2,
                            }}
                        >
                            <Typography variant="h3">
                                {article.headline}
                            </Typography>
                            <Typography variant="h5">
                                {article.author}
                            </Typography>
                            <Typography variant="h5">
                                {parse(article.body)}
                            </Typography>
                            <Button
                                id={article.aid}
                                variant="contained"
                                onClick={editArticleRoute}
                                sx={{
                                    marginBottom: 1,
                                    marginRight: 5,
                                    color: "white",
                                    backgroundColor: "#4685F5",
                                }}
                            >
                                Edit Article
                            </Button>
                            <Button
                                id={article.aid}
                                variant="contained"
                                onClick={readyToPublish}
                                sx={{
                                    marginBottom: 1,
                                    marginRight: 5,
                                    color: "white",
                                    backgroundColor: "#4685F5",
                                }}
                            >
                                Ready to Publish
                            </Button>
                        </Card>
                    ))}
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

export default copyEditorPortal;
