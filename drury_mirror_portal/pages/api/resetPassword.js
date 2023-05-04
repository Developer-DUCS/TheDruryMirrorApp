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

export default async (req, res) => {
	const user = req.body.email;

	const payload = { email: user };
	const secret = process.env.JWT_SECRET;

	const token = jwt.sign(payload, secret);

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
			html: `Hello, ${user}!

					<p>It seems you have forgotten your password. <a href="https://mcs.drury.edu/mirror/submitReset?token=${token}">Please follow this link</a>  to change your password. 
					This link will expire within 15 minutes so if you do not use you will need to request another link.</p>
					
					<p>If you did not request this link please contact your faculty advisor and consider changing your password. </p>
					
					Thank you,<br>
					The Reflecting DUCS <br>
					Drury Mirror Portal`,
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
