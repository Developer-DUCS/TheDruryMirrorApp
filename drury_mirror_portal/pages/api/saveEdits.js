const conn = require("../../backend/mysqldb");

// removed async
export default (req, res) => {
    try {
        console.log("Called saveEdits route");
        const body = req.body;

        let articleString = body.article;
        let isDraft = "2";
        const id = body.id;
        let checked = body.checked;

        // if (body.page) {

        // }
        const page = body.page;

        if (page == "commentViewer" && checked) {
            isDraft = "3";
            let commentsQuery = "DELETE FROM comments WHERE cid = ?";

            conn.query(commentsQuery, [id], (err, rows) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: err,
                    });
                } else {
                    // ! check status code
                    res.status(200).json({ msg: "Successful Deletion" });
                }
            });
        } else if (page != "commentViewer") {
            let editor = body.editor;
            let email = body.email;
            const overAllComments = body.overAllComments;
            const comments = body.comments.toString();

            let saveCommentsQuery =
                "INSERT INTO comments (cid, email, editor, overAllComments, comments, createdDate) VALUES(?,?,?,?,?,NOW())";

            conn.query(
                saveCommentsQuery,
                [id, email, editor, overAllComments, comments],
                (err) => {
                    //console.log("Query: ", conn.query(saveQuery, [testAuthor, testHeadline, articleString]))
                    if (err) {
                        console.log("Something went wrong");
                        console.log(err);
                        res.status(500).json({ error: "Failed Insertion" });
                    } else {
                        res.status(201).json({ msg: "Successful Update" });
                    }
                }
            );
        }

        let updateArticleQuery =
            "UPDATE articles SET body = ?, isDraft = ? WHERE aid = ?";

        conn.query(updateArticleQuery, [articleString, isDraft, id], (err) => {
            //console.log("Query: ", conn.query(saveQuery, [testAuthor, testHeadline, articleString]))
            if (err) {
                console.log("Something went wrong");
                console.log(err);
                res.status(500).json({ error: "Failed Insertion" });
            } else {
                res.status(201).json({ msg: "Successful Update" });
            }
        });

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
