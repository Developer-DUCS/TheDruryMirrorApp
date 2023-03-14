// resetPassword.js
// Page Description:
//                  API to send emails to the User
//Creation Date:
//                  By: Daniel Brinck, Feb. 17 2023
//
//Modificaiton Log:
//
//

const conn = require("../../backend/mysqldb");

export default (req, res) => {
    console.log("Called Reset Password Route");

    const sgMail = require('@sendgrid/mail')

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'developerducs@gmail.com', // Change to your recipient
        from: 'developerducs@gmail.com', // Change to your verified sender
        subject: 'Password Reset',
        text: 'Good afternoon! Use the following steps to reset your password!',
        html: '<strong>Good afternoon! Use the following steps to reset your password!</strong> <a href="http://localhost:3000/submitReset"> Click here to reset </a>',
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
