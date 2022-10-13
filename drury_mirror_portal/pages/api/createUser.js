
const conn = require("../../backend/mysqldb");


export default (req, res) => {
    console.log("Called Create User Route")
    const body = req.body

    let email = body.email
    let password = body.password
    let roles = body.roles

    console.log(email)

    let createQuery = ("INSERT into users (email, password, roles) VALUES (?, ?, ?)")

    let existingQuery = ("SELECT email, roles FROM users WHERE email = ?")
    
    conn.query(existingQuery, [email], (err, rows) => {
        if (rows.length == 0) {
            console.log("no user found")
            conn.query(createQuery, [email, password, roles],  (err, rows) => {

                if (err) {
                    console.log(err)
                    return res.status(500).json({error: err})
                }
                else {
                    res.status(201).json({msg: "User Created"})
                    console.log("User Created")
                }
                
        
            });
        }
        else {
            res.status(401).json({msg: "User already exists"})
            console.log("user already exists")
        }
    });
}