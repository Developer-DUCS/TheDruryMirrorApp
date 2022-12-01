
import { getSession } from 'next-auth/react'

const conn = require("../../backend/mysqldb")

export default async (req, res, session) => {
    console.log("called get article route")

    //let session = await getSession({ req })

    //let testSesssion = session.then()
    let name = session[0]

    console.log(name)

    const body = req.body
    console.log(body)
    console.log(session)
    //const session = await getSession({req})


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

            return res.status(200).json(articles)
            
        }
    });
}