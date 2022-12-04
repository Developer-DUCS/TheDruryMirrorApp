
import { unstable_getServerSession } from "next-auth/next"

import { useSession, signOut, getSession } from 'next-auth/react'

import { getToken } from "next-auth/jwt"


const conn = require("../../backend/mysqldb")

export default async (req, res) => {
    console.log("called get article route")
    console.log(req)
    
    const email = req.body.email
    const page = req.body.page
    let isDraft = '0'

    console.log("email", email)
    console.log("email.length", email.length)
    console.log(typeof email)
    //console.log("session", session)
    //const session = await getSession({req})

    if (page == "draftList") {
        isDraft = '0'
    }
    else if (page == "writerPortal") {
        isDraft = '2'
    }

    console.log("here")

    let getQuery = ("SELECT aid,author,headline,body,isDraft FROM articles WHERE email = ? AND isDraft = ?")

    conn.query(getQuery, [email, isDraft], (err, rows) => {
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
                    aid: row.aid,
                    author: row.author,
                    headline: row.headline,
                    body: row.body,
                    isDraft: row.isDraft
                }
                articles.push(article)

            });
            // console.log(articles)

            return res.status(200).json(articles)
            
        }
    });
}