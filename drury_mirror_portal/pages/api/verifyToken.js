// verifyToken.js
// Page Description:
//                  API to handle the request for deleting a user
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Mar 30, 2023
//
//Modification Log:
//
//
import jwt from "jsonwebtoken";

export default async (req, res) => {
	let token = req.body;
	let validTime = 900;
	let secret = process.env.JWT_SECRET;

	const decoded = jwt.verify(token, secret);
	let email = decoded.email;

	const iat = decoded.iat; // Get the iat claim value

	const now = Math.floor(Date.now() / 1000); // Get the current time as a Unix timestamp in seconds

	if (now - iat < validTime) {
		// Compare the difference between iat and now with one hour (3600 seconds)
		return res.status(200).json(email);
	} else {
		return res.status(401).json({ msg: "Invalid Token" });
	}
};
