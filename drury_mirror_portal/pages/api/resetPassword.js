// resetPassword.js
// Page Description:
//                  API to send emails to the User
//Creation Date:
//                  By: Daniel Brinck, Feb. 17 2023
//
//Modificaiton Log:
//
//
import jwt from "jsonwebtoken";
import executeQuery from "../../backend/mysqldb";

const conn = require("../../backend/mysqldb");

export default async (req, res) => {
	const user = req.body.email;
	console.log(user);
	console.log("Called Reset Password Route");

	const payload = { email: user };
	const secret = process.env.JWT_SECRET;

	const token = jwt.sign(payload, secret);
	// console.log(token);

	let tokenQuery =
		"INSERT INTO tokens (email, forgot_password_token) VALUES (?,?)";

	let updateToken =
		"UPDATE tokens SET forgot_password_token = ? WHERE email = ?";

	let getUser = "SELECT * FROM users WHERE email = ?";

	let getToken = "SELECT * FROM tokens WHERE email = ?";

	const result = await executeQuery({
		query: getUser,
		values: user,
	});
	if (result.error) {
		console.log("There was an error with the page");
		res.status(500).json({ error: "Error" });
	} else if (result.length < 1) {
		res.status(404).json({ error: "Email not found" });
	} else {
		const tokenUser = await executeQuery({
			query: getToken,
			values: user,
		});
		if (tokenUser.error) {
			res.status(500).json({ error: "Error" });
		} else if (tokenUser.length < 1) {
			console.log("Length of tokenUser", tokenUser.length);
			const insertToken = await executeQuery({
				query: tokenQuery,
				values: [user, token],
			});
			if (insertToken.error) {
				res.status(500).json({ error: "Error" });
			} else if (insertToken.affectedRows == 1) {
				res.status(201).json({
					response: "token inserted successfully",
				});
			}
		} else {
			const tokenUpdate = await executeQuery({
				query: updateToken,
				values: [token, user],
			});
			if (tokenUpdate.error) {
				res.status(500).json({ error: "Error" });
			} else if (tokenUpdate.affectedRows == 1) {
				res.status(201).json({
					response: "token updated successfully",
				});
			}
		}
		const sgMail = require("@sendgrid/mail");

		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
			to: user, // Change to your recipient
			from: "developerducs@gmail.com", // Change to your verified sender
			subject: "Password Reset",
			text: `"Good afternoon! ${user} Use the following steps to reset your password!"`,
			html: `'<strong> Click link pls :) i not hacks</strong> <a href="http://localhost:3000/submitReset?token=${token}"> Click here to reset </a>'`,
		};
		sgMail
			.send(msg)
			.then(() => {
				console.log("Email sent");
			})
			.catch((error) => {
				console.error(error);
			});
	}
};
