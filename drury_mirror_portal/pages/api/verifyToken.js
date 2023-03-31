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
	console.log("🚀 ~ file: verifyToken.js:16 ~ token:", token);
	let validTime = 900;
	let secret = process.env.JWT_SECRET;

	const decoded = jwt.verify(token, secret);
	console.log("🚀 ~ file: verifyToken.js:19 ~ decoded:", decoded);
	let email = decoded.email;
	console.log("🚀 ~ file: verifyToken.js:21 ~ email:", email);

	const iat = decoded.iat; // Get the iat claim value

	const now = Math.floor(Date.now() / 1000); // Get the current time as a Unix timestamp in seconds

	if (now - iat < validTime) {
		// Compare the difference between iat and now with one hour (3600 seconds)
		console.log("Token is valid"); // Token is valid
		return res.status(200).json(email);
	} else {
		console.log("Token has expired"); // Token has expired
		return res.status(401).json({ msg: "Invalid Token" });
	}
};
