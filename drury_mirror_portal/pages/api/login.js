

const conn = require("../../backend/mysqldb");


export default (req, res) => {
    console.log("Called Login Route")
    const body = req.body

    let username = body.username
    let password = body.password

    let authQuery = ("SELECT username, password FROM users WHERE username = ?")

    conn.query(authQuery, [username], (err, rows) => {

        if (err) return res.status(500).json({error: err})
        
        if (rows.length == 0) {
            res.status(400).json({ msg: "User Not Found"}) // check status code
            console.log("User Not Found")
        }
        else {
            if (password == rows[0].password) {
                res.status(200).json({msg: "User Authenticated"})
                console.log("User Authenticated")
            }
            else {
              res.status(401).json({msg: "User Unauthorized"});
              console.log("User Unauthorized")
            }
        }




    });



}