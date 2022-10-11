
const conn = require("../../backend/mysqldb");


export default (req, res) => {
    console.log("Called Create User Route")
    const body = req.body

    let username = body.username
    let password = body.password
    let role = body.role

    let createQuery = ("INSERT into users (username, password, role) VALUES (?, ?, ?)")

    let existingQuery = ("SELECT username, role FROM users WHERE username = ?")
    
    conn.query(existingQuery, [username], (err, rows) => {
        if (rows.length == 0) {
            console.log("no user found")
            conn.query(createQuery, [username, password, role],  (err, rows) => {

                if (err) return res.status(500).json({error: err})
                
                else {
                    res.status(201).json({msg: "User Created"});
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