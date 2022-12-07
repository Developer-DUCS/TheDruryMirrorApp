// writerPortal.js
// Page Description:
//                  The home page for the writer
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 4 2022
//
//Modificaiton Log:
//
//

import styles from "../styles/article.module.css";
import { useRouter } from "next/router";
import { useSession, signOut, getSession } from "next-auth/react";
import { useState, useEffect } from "react";

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
    /**
     * @param  {} event
     * highlight the function signature, open the command palette, type >add doc comment
     */
    const writeDraftRoute = async (event) => {
        router.push("articleWriting");
        console.log("article id: ", event.currentTarget.id);
        router.push({
            pathname: "articleWriting",
            query: { id: event.currentTarget.id },
        });
    };

    const seeCommentsRoute = async (event) => {
        router.push("commentViewer");
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
        console.log(data.user);
        console.log(data.user.role);
        const role = data.user.role;

        return (
            <>
                <p id="article"></p>
                <div className={styles.divWelcome}>
                    <p>
                        {data.user.fname} {data.user.lname}
                    </p>
                    <text className={styles.welcome}>Article List</text>
                    <button
                        className={styles.draftButton}
                        onClick={() => signOut()}
                    >
                        Log Out
                    </button>
                    <button
                        className={styles.draftButton}
                        onClick={writeDraftRoute}
                    >
                        Write Draft
                    </button>
                </div>
                {console.log("articles", articles)}
                {articles.length != 0 ? (
                    <div className={styles.divArticle}>
                        <ul>
                            {articles.map((article) => (
                                <li className={styles.indArticle}>
                                    {article.headline}
                                    <text className={styles.author}>
                                        By: {article.author}
                                    </text>
                                    <text>{parse(article.body)}</text>
                                    <div className={styles.buttons}>
                                        <button
                                            id={article.aid}
                                            className={styles.edit}
                                            onClick={seeCommentsRoute}
                                        >
                                            See Comments
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>You don't have any articles</p>
                )}
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
