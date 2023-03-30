// resetPassword.js
// Page Description:
//                  API to send emails to the User
//Creation Date:
//                  By: Daniel Brinck, Feb. 17 2023
//
//Modificaiton Log:
//
//
import jwt from "jsonwebtoken"
import executeQuery from "../../backend/mysqldb";

const conn = require("../../backend/mysqldb");

export default async (req, res) => {
    const user = req.body
    console.log(user)
    console.log("Called Reset Password Route");

    const payload = {email: "user"}
    const secret = 'szIE1A6mqKLHeT3x/3+kaFKnLT27Ohva3y3TcQ3mmmY='

    const token = jwt.sign(payload, secret);
    console.log(token);

    let tokenQuery = "";

    let getUser = "SELECT * FROM users WHERE email = ?";

    const result = await executeQuery({
        query: getUser,
        values: user,
    });
    console.log("Result", result);
    console.log("Result.length", result.length);
    if (result.error) {
        console.log("There was an error with the page");
        res.status(500).json({ error: "Error"});
    } else if(result.length < 1){
       res.status(404).json({ error: "Email not found"});
    } 
    else {
        res.status(200).json({msg: 'here'});
    }



    const sgMail = require('@sendgrid/mail')

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'thosnield@gmail.com', // Change to your recipient
        from: 'developerducs@gmail.com', // Change to your verified sender
        subject: 'Password Reset',
        text: 'Good afternoon! Use the following steps to reset your password!',
        html: '<strong>Good afternoon! Use the following steps to reset your password! Click the link to go to the reset page</strong> <a href="http://localhost:3000/submitReset"> Click here to reset </a>',
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })

};
