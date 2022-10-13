
const conn = require("../../backend/mysqldb")

export default (req, res) => {
    console.log("called get user route")
    const body = req.body

    let getQuery = ("SELECT email, roles FROM users")

    conn.query(getQuery, (err, rows) => {
        if (err){
            return res.status(500).json({error: err})
        }
        else if (rows.length == 0){
            return res.status(400).json({msg: "User not found"})
        }
        else {
            let users = []
            rows.forEach((row) => {
                console.log("row: ", row)

                let user = {
                    email: row.email,
                    roles: row.roles
                }

                users.push(user)

            });

            console.log("Users list: ", users)

            return res.status(200).json(users)
            
        }
    });


}