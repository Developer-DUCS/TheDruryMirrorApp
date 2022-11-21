
const conn = require("../../backend/mysqldb");

// removed async
export default (req, res) => {
    try {
        console.log("Called saveArticle route");
        const body = req.body;
        console.log("article", body.article);

        let articleString = body.article;
        let testAuthor = "Test Author"
        let testHeadline = "Test Headline"

        let saveQuery = ("INSERT INTO articles(author, headline, body, isDraft, createdDate) VALUES(?,?,?,'1', NOW())");

        conn.query(saveQuery, [testAuthor, testHeadline, articleString], (err) => {
            //console.log("Query: ", conn.query(saveQuery, [testAuthor, testHeadline, articleString]))
            if (err) {
                console.log("Something went wrong");
                console.log(err)
                res.status(500).json({error: "Failed Insertion"});
            }
            else {
                res.status(201).json({msg: "Successful Insertion"});
            }
        });

        // const result = ({
        //     query: 'INSERT INTO test(article) VALUES(?)',
        //     values: articleString
        // });
        // res.status(201).json({msg: "Insertion Successful"});
        // console.log("here");
        // console.log(result);
    }
    catch (error) {
        console.log(error);
    }

};
