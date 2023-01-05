// ----------------------------------------------------------------
//
// LoginUser.js
//
// Logs user in and stores their session token in local storage
//
// TODO: Fix "undefined" error for hashing password
//
// ----------------------------------------------------------------

const bcrypt = require("bcryptjs");

const contentful = require("contentful-management");

const client = contentful.createClient({
    accessToken: "CFPAT-r1ZzcvV18KpPzLm7dhrNJlMngdzJf-xlYlgcw6QfIe4",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    console.log("Body: \n" + JSON.stringify(req.body));

    let username = req.body.username;
    let password = req.body.password;

    console.log("Retreived: \n" + "user: " + username + "\npass: " + password);

    if (username != "" && password != "") {
        console.log("🚀 Querying Contenful...");
        let spaceID = process.env.CONTENTFUL_SPACE_ID;

        client
            .getSpace(spaceID)
            .then((space) => {
                space.getEnvironment("master").then((environment) => {
                    environment
                        .getEntries({
                            content_type: "user",
                        })
                        .then((response) => {
                            let item;
                            let realUsername = "";
                            let realEmail = "";
                            let hashedPassword;

                            let userInfo;

                            // Entries.items is a list of all entries within the environment, within the space
                            // Iterative search for correct username and email
                            for (
                                let i = 0;
                                i < response.items.length;
                                i++
                            ) {
                                item = response.items[i];

                                // Current email
                                const curEmail = item.fields.email["en-US"];
                                console.log("🚀 ~ file: LoginUser.js:59 ~ .then ~ curEmail", curEmail)

                                // Current password
                                const curPassword =
                                    item.fields.password["en-US"];
                                hashedPassword = curPassword;

                                // Check if either username or email is correct
                                if (username === curEmail) {
                                    realEmail = curEmail;
                                    userInfo = item.fields;
                                    break;
                                }
                            }

                            // Check if real username or email was found
                            if (realUsername != "" || realEmail != "") {
                                // Was found

                                // 2. Compare passwords
                                console.log("Comparing password...");
                                bcrypt.compare(
                                    password,
                                    hashedPassword,
                                    function (err, isMatch) {
                                        if (err) {
                                            console.log(
                                                "🚀 ~ file: LoginUser.js:91 ~ environment.getEntries ~ err",
                                                err
                                            );
                                        } else if (!isMatch) {
                                            console.log(
                                                "Passwords don't match!"
                                            );
                                            console.log(
                                                "Passwords: " + password
                                            );

                                            let response = {
                                                message: "Failed Login",
                                            };

                                            res.status(401).json(response);
                                        } else {
                                            console.log("Passwords match!");
                                            console.log(
                                                "API: Logging user in..."
                                            );

                                            // 4. Success. Send response back
                                            let data = {
                                                message: "Success",
                                                payload: userInfo,
                                            };

                                            console.log(
                                                "LoginUser Info: \n" +
                                                    data.payload
                                            );

                                            res.status(200).json(data);
                                        }
                                    }
                                );
                            }
                        });
                });
            })
            .catch((err) => {
                res.status(403).json({ message: "Client Error", error: err });
            });
    } else {
        console.log("Invalid inputs.");
        let response = {
            message: "Invalid Inputs",
        };

        res.status(401).json(response);
    }
};
