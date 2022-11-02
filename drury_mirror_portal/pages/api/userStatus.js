// userStatus.js
// Page Description:
//                  API to handle the request for updating a user's status
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Nov. 1 2022 
//
//Modificaiton Log:
//                  
//          

const conn = require("../../backend/mysqldb");


export default (req, res) => {
    console.log("Called Update User Status Route")
    const body = req.body

    let email = body.email
    let active = body.active

    // Change the true/false value to 1/0
    if (active) {
        active = 1
    }
    else {
        active = 0
    }

    console.log(email)

    let updateStatusQuery = ("UPDATE users SET active = ? WHERE email = ?")

    let existingQuery = ("SELECT email FROM users WHERE email = ?")
    
    conn.query(existingQuery, [email], (err, rows) => {
        if (rows.length == 1) {
            console.log("user found")
            conn.query(updateStatusQuery, [active, email],  (err, rows) => {

                if (err) {
                    console.log(err)
                    return res.status(500).json({error: err})
                }
                else {
                    res.status(200).json({msg: "User Status Updated"})
                    console.log("User Status Updated")
                }
            });
        }
        else {
            res.status(401).json({msg: "User does not exist"})
            console.log("user does not exist")
        }
    });
}