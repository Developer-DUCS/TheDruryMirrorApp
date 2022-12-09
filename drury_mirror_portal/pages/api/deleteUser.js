// deleteUser.js
// Page Description:
//                  API to handle the request for deleting a user
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Nov. 1 2022
//
//Modificaiton Log:
//
//

const conn = require("../../backend/mysqldb");

export default (req, res) => {
    console.log("Called Delete User Route");
    const body = req.body;

    let email = body.email;

    console.log(email);

    let deleteQuery = "DELETE FROM users WHERE email = ?";

    let existingQuery = "SELECT email FROM users WHERE email = ?";

    conn.query(existingQuery, [email], (err, rows) => {
        if (rows.length == 1) {
            console.log("user found");
            conn.query(deleteQuery, [email], (err, rows) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: err });
                } else {
                    res.status(204).json({ msg: "User Deleted" });
                    console.log("User Deleted");
                }
            });
        } else {
            res.status(401).json({ msg: "User does not exist" });
            console.log("user does not exist");
        }
    });
};
