// submitReset.js
// Page Description:
//                  Page used to handle the reset submit
//Creation Date:
//                  By: Daniel Brinck  Mar. 8 2023
//
//Modificaiton Log:
//
//

import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { TextField, Button, FormGroup, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function confirmReset() {
	const router = useRouter();

	const [isError, setIsError] = useState(null);
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [userEmail, setUserEmail] = useState("");

	// Verify the token
	useEffect(() => {
		const checkToken = async () => {
			if (router.query.token) {
				let token = router.query.token;

				const endpoint = "api/verifyToken";

				const data = token;
				const JSONdata = JSON.stringify(data);

				const options = {
					// The method is POST because we are sending data.
					method: "POST",
					// Tell the server we're sending JSON.
					headers: {
						"Content-Type": "application/json",
					},
					// Body of the request is the JSON data we created above.
					body: JSONdata,
				};

				const response = await fetch(endpoint, options);
				const result = await response.json();

				if (response.ok) {
					setIsAuthorized(true);
					setUserEmail(result);
				}
			}
		};
		checkToken();
	}, [router.query.token]);

	// When reset password is clicked, send an api request to begin update password process
	const handleReset = async (event) => {
		event.preventDefault();

		let password = event.target.password.value;
		let confirmPassword = event.target.confirmPassword.value;

		if (password == confirmPassword) {
			setIsError(false);
			let endpoint = "api/updatePassword";

			let data = {
				email: userEmail,
				password: password,
			};
			const JSONdata = JSON.stringify(data);

			const options = {
				// The method is POST because we are sending data.
				method: "POST",
				// Tell the server we're sending JSON.
				headers: {
					"Content-Type": "application/json",
				},
				// Body of the request is the JSON data we created above.
				body: JSONdata,
			};

			const response = await fetch(endpoint, options);
			const result = await response.json();
			if (response.ok) {
				router.push(`${process.env.NEXT_PUBLIC_API_PATH}/`);
			}
		} else {
			setIsError(true);
		}
	};

	if (isAuthorized) {
		return (
			<>
				<div className={styles.formContainer}>
					<form onSubmit={handleReset}>
						<FormGroup className={styles.formItem}>
							<Grid
								container
								direction={"column"}
								spacing={2}
								justifyContent="center"
								alignItems="center"
								className={styles.formContainer}
							>
								<Grid item>
									<Typography variant="logo">
										Drury Mirror
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="">
										Enter your new password
									</Typography>
								</Grid>
								<TextField
									sx={{
										input: {
											color: "black",
										},
										label: {
											color: "black",
										},
									}}
									id="password"
									name="password"
									label="password"
									variant="standard"
									type="password"
								/>

								<Typography variant="">
									Confirm Password
								</Typography>
								<TextField
									sx={{
										input: {
											color: "black",
										},
										label: {
											color: "black",
										},
									}}
									id="confirmPassword"
									name="confirmPassword"
									label="confirmPassword"
									variant="standard"
									type="password"
								/>

								<Button
									sx={{ marginTop: 2 }}
									variant="contained"
									size="small"
									color="error"
									type="submit"
								>
									Reset Password
								</Button>
							</Grid>
						</FormGroup>
					</form>
					{isError === true && (
						<div>
							<Typography
								variant="h4"
								sx={{
									margin: 1,
									marginTop: 1,
									color: "red",
								}}
							>
								Your passwords do not match
							</Typography>
						</div>
					)}
					{isError === false && (
						<div>
							<Typography
								variant="h4"
								sx={{
									margin: 1,
									marginTop: 1,
									color: "green",
								}}
							>
								Your passwords Match! Your password has been
								reset.
							</Typography>
						</div>
					)}
				</div>
			</>
		);
	} else {
		return (
			<>
				<h1>403 Unauthorized</h1>
			</>
		);
	}
}
