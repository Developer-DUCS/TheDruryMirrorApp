// ----------------------------------------------------------------
//
// GetArticles.JS
// !!! (mobile version, not to be confused with portal) !!!
// - fetches all article data except body and thumbnails
//
// TODO body is loaded on article click
// TODO first 20 thumbnails are downloaded
// - as the user scrolls down, refresh
//
// ----------------------------------------------------------------

const conn = require("../../backend/mysqldb");

export default async (req, res) => {

    console.log("called get article route for: " + req.body.searchText);

    // Return results
    let responseData = "";

    // Define the text to match
    const searchText = req.body.searchText;

    // Start MySQL
    conn.connect();

    // Build the SQL query to look up rows with matching headline text
    const query = `SELECT * FROM articles WHERE headline LIKE '%${searchText}%'`;

    // Execute the query
    conn.query(query, (error, rows, fields) => {
        if (error) {
            console.error("ERROR:\n" + error);
            return;
        }
        
        let articles = [];
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

        //createArticleIndices(articles);

        return res.status(200).json(articles);
    });

    // Close the database connection
    if(responseData != "") { 
        conn.end() 
    };    


}; 
