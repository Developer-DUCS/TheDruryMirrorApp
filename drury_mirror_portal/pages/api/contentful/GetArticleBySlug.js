// import contentful
const contentful = require("contentful-management");

// connect to contentful client (where classes are stored)
const client = contentful.createClient({
    accessToken: "CFPAT-r1ZzcvV18KpPzLm7dhrNJlMngdzJf-xlYlgcw6QfIe4",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
    let articleSlug = req.body.slug;

    // Remove '[]' from articleSlug, currently '[The-Queen-Died]'
    let splitOne = `${articleSlug}`.split("]");
    let splitTwo = `${splitOne[0]}`.split("[");

    articleSlug = splitTwo[1]; // now 'The-Queen-Died'

    console.log("🚀 ~ file: GetClassBySlug.js:14 ~ articleSlug", articleSlug);

    // 1. Set up client to retreive class entries
    // - getSpace
    // - getEnvironment
    // - getEntries
    // - Check for Data
    client
        .getSpace("p9emldik5f4w")
        .then((space) => {
            space.getEnvironment("master").then((environment) => {
                environment
                    .getEntries({
                        content_type: "article",
                    })
                    .then((response) => {
                        let articleData = "";

                        // Find corresponding class with correct slug, return data
                        response.items.every((element) => {
                            console.log("🚀 ~ file: GetBlogBySlug.js:39 ~ response.items.every ~ element", JSON.stringify(element))
                            
                            if (element.fields.slug["en-US"] == articleSlug) {
                                articleData = element.fields;
                                return false;
                            }

                            return true;
                        });

                        if (articleData == "") {
                            // Set up data
                            let payload = {
                                message: "Not Found",
                            };

                            res.status(404).json(payload);
                        } else {
                            // Set up data
                            let payload = {
                                data: articleData,
                            };

                            res.status(200).json(payload);
                        }
                    });
            });
        })
        .catch((err) => {
            // Error with connecting to Contentful
            res.status(403).json({ message: "Client Error", error: err });
        });
};
