
import { unstable_getServerSession } from "next-auth/next"

import { useSession, signOut, getSession } from 'next-auth/react'

import { getToken } from "next-auth/jwt"


const conn = require("../../backend/mysqldb")

export default async (req, res) => {
    console.log("called get article route")
    
    const email = req.body
    console.log("email", email)
    console.log("email.length", email.length)
    console.log(typeof email)
    //console.log("session", session)
    //const session = await getSession({req})

    console.log("here")

    let getQuery = ("SELECT author,headline,body FROM articles WHERE email = ?")

    conn.query(getQuery, [email], (err, rows) => {
        console.log("here2")

        if (err){
            console.log("error",err)
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
            // console.log(articles)

            return res.status(200).json(articles)
            
        }
    });
}