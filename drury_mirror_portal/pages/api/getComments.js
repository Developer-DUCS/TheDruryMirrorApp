// getArticle.js
// Page Description:
//                  Landing page for the copy editor after they log in to the site
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 26 2022
//
//Modificaiton Log:
//
//

// connection requirement
const conn = require("../../backend/mysqldb");

// api route for getting a single article
export default (req, res) => {
    //body = req.body
    //articleName = body.articleName
    //console.log("Article Name: ", articleName)

    let id = req.body.id;
    let email = req.body.email;
    console.log(id);
    console.log(email);
    let getCommentsQuery = "SELECT * FROM comments WHERE cid = ?;";

    conn.query(getCommentsQuery, [id], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        } else if (rows.length == 0) {
            return res.status(400).json({ msg: "Articles not found" });
        } else {
            //console.log(rows[0].headline)
            //console.log(rows[0].body)
            let overallComments = rows[0].overallComments;
            let comments = rows[0].comments;
            console.log("overAllComments: ", overallComments);
            console.log("comments: ", comments);
            let data = {
                overallComments: overallComments,
                comments: comments,
            };
            return res.status(200).json(data);
        }
    });
};
