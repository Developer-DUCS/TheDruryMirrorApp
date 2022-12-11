// writerPortal.js
// Page Description:
//                  The home page for the writer
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 4 2022
//
//Modificaiton Log:
//
// 12/03 - Thomas O. standardized the styling on this page to match the other portals' styling
//
import styles from "../styles/article.module.css";
import { useRouter } from "next/router";
import { useSession, signOut, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
    TextField,
    Button,
    FormGroup,
    Grid,
    Typography,
    Card,
    Toolbar,
} from "@mui/material";

export function writerPortal() {
    const router = useRouter();
    const { status, data } = useSession();
    const [getArticles, setArticles] = useState([]);
    const parse = require("html-react-parser");

    // Redirect the user to the log in screen
    const redirectToSignIn = (event) => {
        event.preventDefault();
        router.push("/");
    };

    // Handle the write draft button
    const writeDraftRoute = async (event) => {
        router.push({
            pathname: "articleWriting",
        });
    };
    // Handle the see comments button
    const seeCommentsRoute = async (event) => {
        console.log("article id: ", event.currentTarget.id);
        router.push({
            pathname: "commentViewer",
            query: { id: event.currentTarget.id },
        });
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
                    page: "writerPortal",
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
                if (response.status !== 200) {
                    console.log(response.status);
                    console.log(response.statusText);
                } else {
                    let articles = await response.json();

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
    // Check if the user is authenticated
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
                                By: {article.author}
                            </Typography>
                            <Typography variant="h5">
                                {parse(article.body)}
                            </Typography>
                            <Button
                                id={article.aid}
                                onClick={seeCommentsRoute}
                                variant="contained"
                                sx={{
                                    marginBottom: 1,
                                    marginRight: 5,
                                    color: "white",
                                    backgroundColor: "#4685F5",
                                }}
                            >
                                See Comments
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

export default writerPortal;
