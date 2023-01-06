// --------------------------------------------------
//
// CreateUser.js
// - Creates a new Entry with a Content Model type of User
// - Info parsed from inputs on Manager.js
//
// Contentful Documentation: https://www.contentful.com/help/adding-new-entry/
//
// Modification Log:
// 01 04 - Thomas O. created CreateUser.js
//
// TODO: 
// - Thumbnail (prevents current articles from publishing)
// - Upload Button for Thumbnail
//
// --------------------------------------------------

const bcrypt = require("bcryptjs");

const contentful = require("contentful-management");

const client = contentful.createClient({
    accessToken: "CFPAT-r1ZzcvV18KpPzLm7dhrNJlMngdzJf-xlYlgcw6QfIe4",
});

export default (req, res) => {
    let body = req.body
    let spaceID = process.env.CONTENTFUL_SPACE_ID;

    let readyForEdits = body.readyForEdits;
    let articleString = body.article;
    let author = body.author;
    let testHeadline = "Test Headline";
    let email = body.email;

    // Headline: "Test Headline New Article Saved Recently"
    let headlineWords = testHeadline.split(" ") // now "[Test, Headline, New, Article, Saved, Recently]"
    let slug = "";

    // Limits slug to five words
    if( headlineWords.length == 5){
        for (let i = 0; i < 5; i++) {
            const element = headlineWords[i];
            if(i == 4) slug += element;
            if(i < 5) slug += element + "-";
        }
    }

    if( headlineWords.length == 4){
        for (let i = 0; i < 4; i++) {
            const element = headlineWords[i];
            if(i == 3) slug += element;
            if(i < 4) slug += element + "-";
        }
    }

    if( headlineWords.length == 3){
        for (let i = 0; i < 3; i++) {
            const element = headlineWords[i];
            if(i == 2) slug += element;
            if(i < 3) slug += element + "-";
        }
    }

    if( headlineWords.length == 2){
        for (let i = 0; i < 2; i++) {
            const element = headlineWords[i];
            if(i == 1) slug += element;
            if(i < 2) slug += element + "-";
        }
    }
    if( headlineWords.length == 1){
        for (let i = 0; i < 1; i++) {
            const element = headlineWords[i];
            if(i < 5) slug += element + "-";
        }
    }

    // Now: "Test-Headline-New-Article-Saved"

    // TODO: Thumbnail upload

    // Create entry
    // - gets space via space ID
    // - retrieves environment, environment handles entries
    // - foo: {"en-US": ${bar}} ("en-US" is required for localization on contentful (cant change))
    client
        .getSpace(spaceID)
        .then((space) => space.getEnvironment("master"))
        .then((environment) => {
            const date = new Date()
            let dateTime = date.getDate();
            environment.createEntry("article", {
                fields: {
                    author: { "en-US": `${author}` },
                    authorEmail: { "en-US": `${email}` },
                    headline: { "en-US": `${testHeadline}` },
                    body: { "en-US": `${articleString}` },
                    status: { "en-US": 0 },
                    creationDate: { "en-US": `${dateTime}` },
                    comments: { "en-US": { comments: [{}] } },
                    slug: { "en-US": `${slug}` },
                    check: { "en-US": `${readyForEdits}` },
                },
            });
        })
        .then((entry) => {
            console.log("Entry Made: \n" + JSON.stringify(entry));

            entry.publish(); // publish to contentful CMS

            let resData = {
                message: "Created Entry",
                entry: entry,
            };

            res.status(201).json(resData);
            return;
        })
        .catch((err) => {
            console.log("\nEntry Creation Error: \n" + err);

            let resData = {
                message: "Entry Creation Error",
                error: err,
            };

            res.status(400).json(resData);
            return;
        });
};
