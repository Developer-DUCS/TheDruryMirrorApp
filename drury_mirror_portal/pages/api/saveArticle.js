const conn = require("../../backend/mysqldb");

// removed async
export default (req, res) => {
    try {
        console.log("Called saveArticle route");
        const body = req.body;
        console.log("author", body.author);
        console.log("article", body.article);
        console.log("check", body.check);

        let check = body.check;
        let articleString = body.article;
        let author = body.author;
        let testHeadline = "Test Headline";
        let email = body.email;

        if (check) {
            check = "1";
        } else {
            check = "0";
        }

        let saveQuery = "";

        if (body.aid) {
            let isDraft = "1";
            let aid = parseInt(body.aid);
            saveQuery =
                "UPDATE articles SET headline = ?, body = ?, isDraft = ? WHERE aid = ?";
            conn.query(
                saveQuery,
                [testHeadline, articleString, isDraft, aid],
                (err) => {
                    //console.log("Query: ", conn.query(saveQuery, [testAuthor, testHeadline, articleString]))
                    if (err) {
                        console.log("Something went wrong");
                        console.log(err);
                        res.status(500).json({ error: "Failed Insertion" });
                    } else {
                        res.status(201).json({ msg: "Successful Insertion" });
                    }
                }
            );
        } else {
            saveQuery =
                "INSERT INTO articles(email,author, headline, body, isDraft, createdDate) VALUES(?,?,?,?,?, NOW())";

            conn.query(
                saveQuery,
                [email, author, testHeadline, articleString, check],
                (err) => {
                    //console.log("Query: ", conn.query(saveQuery, [testAuthor, testHeadline, articleString]))
                    if (err) {
                        console.log("Something went wrong");
                        console.log(err);
                        res.status(500).json({ error: "Failed Insertion" });
                    } else {
                        res.status(201).json({ msg: "Successful Insertion" });
                    }
                }
            );
        }

        // const result = ({
        //     query: 'INSERT INTO test(article) VALUES(?)',
        //     values: articleString
        // });
        // res.status(201).json({msg: "Insertion Successful"});
        // console.log("here");
        // console.log(result);
    } catch (error) {
        console.log(error);
    }
};
