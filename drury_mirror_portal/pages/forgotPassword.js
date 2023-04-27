// forgotPassword.js
// Page Description:
//                  Page used to handle forgot password functionality
//Creation Date:
//                  By: Daniel Brinck  Feb. 15 2023
//
//Modificaiton Log:
//
//

import { useRouter } from "next/router";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import React from "react";

export default function resetPage() {
	const [getEmail, setEmail] = React.useState();

	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();
		let emailReset = getEmail;
		const endpoint = "api/getUsers";

		const options = {
			// The method is POST because we are sending data.
			method: "GET",
			// Tell the server we're sending JSON.
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(endpoint, options);

		if (response.status == 200) {
			//const test = document.getElementById("Email")
			let users = await response.json();
			for (let user of users) {
				if (user.email == getEmail) {
					handleEmail();
				}
			}
		} else {
		}
	};

	const handleEmail = async () => {
		const endpoint2 = "api/resetPassword";

		const data = {
			email: getEmail,
		};
		const options2 = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};

		const response2 = await fetch(endpoint2, options2);
		if (response2.status == 201) {
			router.reload();
		}
	};

	return (
		<Box sx={{ height: "100vh", backgroundColor: "#F3F3F3" }}>
			<Typography
				variant="logo"
				sx={{
					display: "flex",
					alignSelf: "center",
					justifyContent: "center",
					marginBottom: 3,
				}}
			>
				Drury Mirror
			</Typography>
			<Grid
				container
				direction={"column"}
				spacing={2}
				width
				justifyContent="center"
				alignItems="center"
			>
				<Grid item>
					<Typography variant="h4">
						Please enter your email.
					</Typography>
				</Grid>
				<Grid item>
					<TextField
						sx={{
							m: 2,
							input: {
								color: "black",
								backgroundColor: "#F3F3F3",
							},
							label: {
								color: "black",
							},
						}}
						id="Email"
						name="Email"
						variant="standard"
						value={getEmail}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</Grid>
				<Grid item>
					<Button
						onClick={() => {
							handleSubmit;
						}}
						variant="contained"
						size="small"
						color="error"
						type="submit"
					>
						Reset Password
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}
