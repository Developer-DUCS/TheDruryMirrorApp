// ----------------------------------------------------------------
//
// GetArticleByTag.JS
// - Fetches articles from the database depending on their tags
//
// ----------------------------------------------------------------

import { forEach } from "lodash";

const conn = require("../../backend/mysqldb");

export default async (req, res) => {

    // Define the text to match
    const filterByTag = req.body.filterBy;
    console.log("Filtering by Tag: " + filterByTag);

    // Build the SQL query to look up rows with matching headline text
    let query = `SELECT * FROM articles`;

    // 1. Fetch all articles

    // Execute the query
    let articles = [];
    conn.query(query, (error, rows, fields) => {
        if (error) {
            console.error("ERROR:\n" + error);
            return;
        }
        rows.forEach((row) => {
            let article = {
                aid: row.aid,
                author: row.author,
                headline: row.headline,
                body: row.body,
                isDraft: row.isDraft,
                thumbnailImage: row.thumbnailImage,
            };

            articles.push(article);
        });

        // Return if no filter
        if (filterByTag === "All" || filterByTag === "Recent") {
            console.log("Called recent articles.");
            console.log(articles);
            return res.status(200).json(articles);
        }
    });

    // 2. Fetch all tag rows if filter

    if (filterByTag === "Local" || filterByTag === "National" || filterByTag === "International") {
        
        // Update the query
        query = `SELECT * FROM tags WHERE ${filterByTag} LIKE 1`;

        conn.query(query, (error, rows, fields) => {
            if (error) {
                console.error("ERROR:\n" + error);
                return;
            }

            let articlesToReturn = []

            rows.forEach((row) => {

                // 3. Filter article feed
                // - A dictionary is used to map tag IDs to article IDs
                // - This eliminates another for-loop, optimizing load times
                for  (let articleIndex = 0; articleIndex < articles.length; articleIndex++ ) {

                    const article = articles[articleIndex];
        
                    // Filter by tag, check if null, push accordingly
                    if (article.aid === row.tid) {
                        articlesToReturn.push(article);
                        console.log("Pushed Article: " + articles.headline);
                    }
                }

            });

            console.log(articlesToReturn)
            return res.status(200).json(articlesToReturn);
        });

    }
};
