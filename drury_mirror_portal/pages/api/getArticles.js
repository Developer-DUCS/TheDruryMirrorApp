import { unstable_getServerSession } from "next-auth/next";

import { useSession, signOut, getSession } from "next-auth/react";

import { getToken } from "next-auth/jwt";

const conn = require("../../backend/mysqldb");

export default async (req, res) => {
    console.log("called get article route");
    // ! Shit doesn't work
    // ? Does it work?
    //// Done, don't need this
    // * Highlighted comment

    // * Turbo console log
    // * select what to log
    // * ctrl+option+l
    // TODO: install tabnine

    const email = req.body.email;
    console.log("🚀 ~ file: getArticles.js:22 ~ email", email);
    const page = req.body.page;
    console.log("🚀 ~ file: getArticles.js:24 ~ page", page);
    let isDraft = "0";
    const test = 2;

    console.log("email", email);
    console.log("email.length", email.length);
    console.log(typeof email);
    //console.log("session", session)
    //const session = await getSession({req})

    if (page == "draftList") {
        isDraft = "0";
    } else if (page == "copyEditorPortal") {
        isDraft = "1";
    } else if (page == "writerPortal") {
        isDraft = "2";
    }

    console.log(page);

    let getQuery =
        "SELECT aid,author,headline,body,isDraft FROM articles WHERE email = ? AND isDraft = ?";

    let editQuery =
        "SELECT aid,author,headline,body,isDraft FROM articles WHERE email != ? AND isDraft = ?";

    let query = "";
    if (page == "copyEditorPortal") {
        query = editQuery;
    } else {
        query = getQuery;
    }
    conn.query(query, [email, isDraft], (err, rows) => {
        console.log("here2");

        if (err) {
            console.log("error", err);
            return res.status(500).json({ error: err });
        } else if (rows.length == 0) {
            return res.status(400).json({ msg: "Articles not found" });
        } else {
            let articles = [];
            rows.forEach((row) => {
                //console.log("row: ", row);

                let article = {
                    aid: row.aid,
                    author: row.author,
                    headline: row.headline,
                    body: row.body,
                    isDraft: row.isDraft,
                };
                articles.push(article);
            });
            //console.log(articles);

            return res.status(200).json(articles);
        }
    });
};
