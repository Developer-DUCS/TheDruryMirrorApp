

const conn = require("../../backend/mysqldb");


export default (req, res) => {
    console.log("Called Login Route")
    const body = req.body

    let email = body.username
    let password = body.password
    let authQuery = ("SELECT email, password, roles FROM users WHERE email = ?")

    conn.query(authQuery, [email], (err, rows) => {

        if (err) return res.status(500).json({error: err})
        
        if (rows.length == 0) {
            res.status(400).json({ msg: "User Not Found"}) // check status code
            console.log("User Not Found")
        }
        else {
            if (password == rows[0].password) {
                let user = {
                    username: rows[0].email,
                    role: rows[0].roles
                }
                res.status(200).json(user)
                console.log("User Authenticated")
            }
            else {
              res.status(401).json({msg: "User Unauthorized"});
              console.log("User Unauthorized")
            }
        }




    });



}