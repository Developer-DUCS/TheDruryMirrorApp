// ----------------------------------------------------------------
//
// GetArticleBySlug.JS
// - Fetches article data via slug (article ID)
//
// ----------------------------------------------------------------

const conn = require("../../backend/mysqldb");

export default async (req, res) => {

    let articleID = req.body.slug

    // Build the SQL query to look up rows with matching headline text
    const query = `SELECT * FROM articles WHERE aid LIKE '${articleID}%'`;

    let article;

    // Execute the query
    conn.query(query, (error, rows, fields) => {
        console.log("🚀 ~ file: GetArticleBySlug.js:26 ~ conn.query ~ rows:", rows);
        if (error) {
            console.error("ERROR:\n" + error);
            return;
        }
        
        rows.forEach((row) => {

            article = {
                aid: row.aid,
                author: row.author,
                headline: row.headline,
                body: row.body,
                isDraft: row.isDraft,
                thumbnailImage: row.thumbnailImage,
                imageType: row.imageType,
            };

            return res.status(200).json(article);
        
        });
    });
}; 
