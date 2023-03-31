// ----------------------------------------------------------------
//
// GetArticleBySlug.JS
// - Fetches article data via slug (article ID)
//
// ----------------------------------------------------------------

const conn = require("../../backend/mysqldb");

export default async (req, res) => {

    let articleID = req.body.slug

    console.log("Getting slug: " + articleID)

    // Build the SQL query to look up rows with matching headline text
    const query = `SELECT * FROM articles WHERE aid LIKE ${articleID}`;

    let article;

    // Execute the query
    conn.query(query, (error, rows, fields) => {
        
        if (error) {
            console.error("ERROR:\n" + error);
            return;
        }

        console.log("Rows: " + rows)
        
        rows.forEach((row) => {

            console.log("Row ID: " + row.aid + " Looking For: " + articleID)
            
            article = {
                aid: row.aid,
                author: row.author,
                headline: row.headline,
                body: row.body,
                isDraft: row.isDraft,
                thumbnailImage: row.thumbnailImage
            };

            console.log("Returning article: \n" + article)
            return res.status(200).json(article);
        
        });
    });
}; 
