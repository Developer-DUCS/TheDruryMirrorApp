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
//
//
// --------------------------------------------------

const bcrypt = require("bcryptjs");

const contentful = require("contentful-management");

const client = contentful.createClient({
    accessToken: "CFPAT-r1ZzcvV18KpPzLm7dhrNJlMngdzJf-xlYlgcw6QfIe4",
});

export default (req, res) => {
    let spaceID = process.env.CONTENTFUL_SPACE_ID;

    let check = body.check;
    let articleString = body.article;
    let author = body.author;
    let testHeadline = "Test Headline";
    let email = body.email;

    // TODO: Thumbnail, Headline

    // Create entry
    // - gets space via space ID
    // - retrieves environment, environment handles entries
    // - foo: {"en-US": ${bar}} ("en-US" is required for localization on contentful (cant change))
    client
        .getSpace(spaceID)
        .then((space) => space.getEnvironment("master"))
        .then((environment) =>
            environment.createEntry("article", {
                fields: {
                    author: { "en-US": `${author}` },
                    authorEmail: { "en-US": `${email}` },
                    headline: { "en-US": `${testHeadline}` },
                    body: { "en-US": `${articleString}` },
                    thumbnail: { "en-US": `${dateTime}` },
                    status: { "en-US": `${roles}` },
                    creationDate: { "en-US": `${roles}` },
                    status: { "en-US": 0 },
                    comments: { "en-US": { comments: [{}] } },
                },
            })
        )
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
