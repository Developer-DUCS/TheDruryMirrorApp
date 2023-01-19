const conn = require("../../backend/mysqldb");

export default async (req, res) => {
    console.log("called get article route");

    // * Turbo console log
    // * select what to log
    // * ctrl+option+l
    // TODO: install tabnine

    let isDraft = "0";
    const test = 2;

    if (page == "draftList") {
        isDraft = "0";
    } else if (page == "copyEditorPortal") {
        isDraft = "1";
    } else if (page == "writerPortal") {
        isDraft = "2";
    } else if (page == "publishPage") {
        isDraft = "4";
    }

    let getQuery =
        "SELECT aid,author,headline,body,isDraft FROM articles WHERE email = ? AND isDraft = ?";
    
    let query = getQuery;

    conn.query(query, [email, isDraft], (err, rows) => {
        if (err) {

            console.log("error", err);
            
            return res.status(500).json({ error: err, msg: "SQL Fetching Error" });
        } else if (rows.length == 0) {

            return res.status(400).json({ msg: "Articles not found" });
        } else {
            let articles = [];
            rows.forEach((row) => {
                let article = {
                    aid: row.aid,
                    author: row.author,
                    headline: row.headline,
                    body: row.body,
                    isDraft: row.isDraft,
                };

                if (page == "publishPage" && article.isDraft != "4") {
                    console.log("skipped article:", article);
                } else {
                    articles.push(article);
                }
            });

            return res.status(200).json(articles);
        }
    });
};
