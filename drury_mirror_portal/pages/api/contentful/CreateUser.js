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
    const body = req.body;

    let email = body.email;
    let password = body.password;
    let roles = body.roles;
    let fname = body.fname;
    let lname = body.lname;

    let spaceID = process.env.CONTENTFUL_SPACE_ID;

    let userID;

    try {

        // 1. Check if Email or Username already exists
        client
            .getSpace(spaceID)
            .then((space) => {
                space.getEnvironment("master").then((environment) => {
                    environment
                        .getEntries({
                            content_type: "user",
                        })
                        .then((response) => {
                            // Search if user already exists
                            userID = response.items.length + 1;
                            console.log("Checking if user exists...");
                            for (
                                let i = 0;
                                i < response.items.length - 1;
                                i++
                            ) {
                                let currentUser = response.items[0];
                                console.log(
                                    "Current: " +
                                        currentUser.fields.email["en-US"] +
                                        " Looking: " +
                                        email
                                );
                                if (
                                    currentUser.fields.email["en-US"] ==
                                        email ||
                                    currentUser.fields.username["en-US"] ==
                                        username
                                ) {
                                    res.status(409).json({
                                        message: "Account Already Exists.",
                                    });
                                    return;
                                }
                            }
                        });
                });
            })
            .catch((err) => {
                res.status(403).json({
                    message: "Client Error",
                    error: err,
                });
                return;
            });

        // 2. Hash passwords
        bcrypt
            .hash(password, 10)
            .then((hash) => {
                password = hash;

                // 3.
                // ------------------------- CONTENTFUL CREATE USER ----------------------------- //

                console.log("Querying contentful...");

                const date = new Date()
                let dateTime = date.getDate();

                // Create entry
                // - gets space via space ID
                // - retrieves environment, environment handles entries
                // - foo: {"en-US": ${bar}} ("en-US" is required for localization on contentful (cant change))
                client
                    .getSpace(spaceID)
                    .then((space) => space.getEnvironment("master"))
                    .then((environment) =>
                        environment.createEntry("user", {
                            fields: {
                                fname: { "en-US": `${fname}` },
                                lname: { "en-US": `${lname}` },
                                email: { "en-US": `${email}` },
                                password: { "en-US": `${password}` },
                                dateCreated: { "en-US": `${dateTime}` },
                                userRoles: { "en-US": `${roles}` },
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
            })
            .catch((err) => {
                console.log("Hash Error: \n" + err);
                
                let resData = {
                    message: "Contentful API Error",
                    error: err,
                };

                res.status(400).json(resData);
                return;
            });
    } catch (error) {

        let resData = {
            message: "API Error",
            error: err,
        };

        console.log("Error: \n" + error.message);

        res.status(400).json(resData);
        return;

    }
};
