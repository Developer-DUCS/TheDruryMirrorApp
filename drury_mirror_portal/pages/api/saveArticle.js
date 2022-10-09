
const conn = require("../../backend/mysqldb");

export default async (req, res) => {
    try {
        console.log("Called saveArticle route");
        const body = req.body;
        console.log("article", body.article);

        let articleString = body.article;

        let saveQuery = ('INSERT INTO test(article) VALUES(?)');

        conn.query(saveQuery, [articleString], (err) => {
            if (err) {
                console.log("Something went wrong");
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
