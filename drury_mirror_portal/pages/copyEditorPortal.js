//Page Description:
//                  Landing page for the copy editor after they log in to the site
//Creation Date:
//                  By: Thomas Nield  Oct. 4 2022
//
//Modificaiton Log:
//                  Implemented getStaticProps
//

import styles from "../styles/article.module.css";
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
                <button
                    className={styles.draftButton}
                    onClick={() => signOut()}
                >
                    Log Out
                </button>
                <div className={styles.divWelcome}>
                    <text className={styles.welcome}>
                        Editable Article List
                    </text>
                    <button
                        className={styles.draftButton}
                        onClick={writeDraftRoute}
                    >
                        Write Draft
                    </button>
                </div>
                {articles.length != 0 ? (
                    <div className={styles.divArticle}>
                        <ul>
                            {articles.map((article) => (
                                <li className={styles.indArticle}>
                                    {article.headline}
                                    <text className={styles.author}>
                                        By: {article.author}
                                    </text>
                                    <text className={styles.body}>
                                        {parse(article.body)}
                                    </text>
                                    <div className={styles.buttons}>
                                        <button
                                            id={article.aid}
                                            className={styles.edit}
                                            onClick={editArticleRoute}
                                        >
                                            Edit Article
                                        </button>
                                        <button
                                            id="publish"
                                            className={styles.publish}
                                        >
                                            Ready to Publish
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

export default copyEditorPortal;
