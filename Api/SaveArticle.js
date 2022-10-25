// SaveArticle.js
// Created: 09/28/2022
// Purpose:
//  Api to save an article from the editor in the Portal.
//
// Modification Log:
//  9/29/2022: Successfully inserted data into a testing table. (Samuel R, Daniel B, Thomas N)

const router = require("express").Router();
const conn = require("../Database/mysqldb");


// TODO:
//  Add a connection file to connect to the database
//  Add a post call with async and await to see if the article already exists
//  Make sure all fields that are required exist
//  

router.post('/', (req, res) => {
    console.log(`Called test route`);

    let testString = "This is a test2";
    //let testString2 = req.body.testString;
    //console.log(testString2);
    let createQuery = ("insert into test(mytest) values(?)");

    // make sure this is a compiled query
    conn.query(createQuery, [testString], (err, rows) => {
        if (err) {
            console.log(`Could not add ${testString} with query ${createQuery}`);
            res.status(500).json({error: "Could not insert."});
        }
        else {
            console.log("Successful Insertion");
            res.status(201).json({msg: "New test string created"});
        }
    });
});

router.post('/saveDraft', (req, res) => {

    let articleHeadline = req.body.articleHeadline
    let articleBody = req.body.articleBody

});


module.exports = router;