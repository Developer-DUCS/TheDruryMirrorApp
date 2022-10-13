
const conn = require("../../backend/mysqldb")

export default (req, res) => {
    console.log("called get article route")
    const body = req.body

    let getQuery = ("SELECT author,headline,body FROM articles")

    conn.query(getQuery, (err, rows) => {
        if (err){
            return res.status(500).json({error: err})
        }
        else if (rows.length == 0){
            return res.status(400).json({msg: "Articles not found"})
        }
        else {
            let articles = []
            rows.forEach((row) => {
                console.log("row: ", row)

                let article = {
                    author: row.author,
                    headline: row.headline,
                    body: row.body
                }

                articles.push(article)

            });

            console.log("Article list: ", articles)

            return res.status(200).json(articles)
            
        }
    });
}