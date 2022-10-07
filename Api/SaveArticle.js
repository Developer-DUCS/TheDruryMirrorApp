// SaveArticle.js
// Created: 09/28/2022
// Purpose:
//  Api to save an article from the editor in the Portal.
//
// Modification Log:
//  9/29/2022: Successfully inserted data into a testing table. (Samuel R, Daniel B, Thomas N)

const router = require("express").Router();
const conn = require("../Database/mysqldb");
const express = require("express");

router.use(express.json());

// TODO:
//  Add a connection file to connect to the database
//  Add a post call with async and await to see if the article already exists
//  Make sure all fields that are required exist
//  

router.post('/', (req, res) => {
    console.log(`Called test route`);

    let createQuery = ("insert into test(mytest) values(?)");

    console.log(`req: ${req}`);
    console.log(`req.body: ${req.body}`);
    console.log(`req type: ${typeof req.body}`);

    //let articleString = req.body.data;    // Works in postman

    let articleString = req.body;
    //articleString = JSON.stringify(articleString);
    //articleString = JSON.parse(articleString);

    console.log(`req articleString["article"]: ${articleString["article"]}`);
    console.log(`req articleString[0]: ${articleString[0]}`);
    console.log(`req articleString.article: ${articleString.article}`);
    console.log(`req type: ${typeof articleString}`);
    //console.log(type(req));

    // make sure this is a compiled query
    conn.query(createQuery, [articleString], (err, rows) => {
        if (err) {
            //console.log(`Could not add ${testString} with query ${createQuery}`);
            res.status(500).json({error: "Could not insert."});
        }
        else {
            console.log("Successful Insertion");
            res.status(201).json({msg: "New test string created"});
        }
    });
});


module.exports = router;