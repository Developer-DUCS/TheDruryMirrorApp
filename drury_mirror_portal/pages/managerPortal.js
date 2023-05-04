// managerPortal.js
// Page Description:
//                  The page that the manager will see, they will be able to manage users, add, update, delete
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 29 2022
//
//Modificaiton Log:
//     (11/1/2022): Minimal viable requirements met for this page. (TN,DB,SR)
//
//

import { styled } from "@mui/material/styles";

import {
	Typography,
	Card,
	CardContent,
	Box,
	Grid,
	Button,
	Input,
	FormGroup,
	TextField,
	FormLabel,
	Select,
	MenuItem,
	InputBase,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Checkbox,
	Stack,
} from "@mui/material";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import SplashHeader from "./SplashHeader";
import React, { useState, useEffect } from "react";

export default function managerPortal() {
	const router = useRouter();

	const [getUsers, setUsers] = useState([]);
	const [isError, setIsError] = useState(null);
	const [isRole, setIsRole] = useState(null);
	const { status, data } = useSession();

	const allowedRoles = ["Manager"];

	// Redirect the user to the log in screen
	const redirectToSignIn = (event) => {
		event.preventDefault();
		router.push(`${process.env.NEXT_PUBLIC_API_PATH}/`);
	};

	useEffect(() => {
		const getUsersRoute = async () => {
			console.log("Getting users");
			const endpoint = `api/getUsers`;

			// Form the request for sending data to the server.
			const options = {
				// The method is POST because we are sending data.
				method: "GET",
				// Tell the server we're sending JSON.
				headers: {
					"Content-Type": "application/json",
				},
				// Body of the request is the JSON data we created above.
				//body: JSONdata,
			};

			const data = await fetch(endpoint, options);

			if (data.status == 200) {
				let users = await data.json();
				console.log(users);
				console.log(users[0]);
				setUsers(users);
			} else {
				console.log("something went wrong");
			}
		};
		getUsersRoute();
	}, []);

	// Handle the creation of a new user
	const handleSubmit = async (event) => {
		event.preventDefault();

		let fname = event.target.fname.value;
		let lname = event.target.lname.value;
		let email = event.target.email.value;
		let password = event.target.password.value;
		let confirmPassword = event.target.confirmPassword.value;
		let roles = event.target.roles.value;

		if (password == confirmPassword && roles != "none") {
			console.log("passwords match");
			setIsError(false);
			setIsRole(true);

			// Get data from the form.
			const data = {
				fname: event.target.fname.value,
				lname: event.target.lname.value,
				email: event.target.email.value,
				password: event.target.password.value,
				roles: event.target.roles.value,
			};

			// Send the data to the server in JSON format.
			const JSONdata = JSON.stringify(data);

			const endpoint = `api/createUser`;

			// Form the request for sending data to the server.
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

			// Send the form data to our forms API on Vercel and get a response.
			const response = await fetch(endpoint, options);
			if (response.status == 201) {
				router.reload(window.location);
			} else {
				// TODO: Display message saying the username or password is incorrect
			}
		} else {
			if (roles == "none") {
				setIsRole(false);
			}
			if (password != confirmPassword) {
				setIsError(true);
			}
		}
	};

	// Handle the deletion of a user
	const handleDelete = async (event) => {
		event.preventDefault();

		let data = {
			email: event.target.name,
		};

		const JSONdata = JSON.stringify(data);

		const endpoint = `${process.env.API_PATH}/api/deleteUser`;

		// Form the request for sending data to the server.
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

		// Wait for the response to see if the user was deleted
		const response = await fetch(endpoint, options);

		if (response.status == 204) {
			router.reload(window.location);
		} else {
			// TODO: Display message saying the user could not be deleted
		}
	};

	// Handle the activation and deactivation of a user
	const handleActive = async (event) => {
		event.preventDefault();

		let data = {
			email: event.target.name,
			active: event.target.checked,
		};

		const JSONdata = JSON.stringify(data);

		const endpoint = "api/userStatus";

		// Form the request for sending data to the server.
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

		// Wait for the response to see if the user was deleted
		const response = await fetch(endpoint, options);

		if (response.status == 200) {
			router.reload(window.location);
		} else {
			// TODO: Display message saying the user could not be deleted
		}
	};

	// Handle role changes
	const handleRole = async (event) => {
		event.preventDefault();

		let data = {
			email: event.target.name,
			role: event.target.roles.value,
		};

		const JSONdata = JSON.stringify(data);

		const endpoint = "api/changeUserRole";

		// Form the request for sending data to the server.
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

		// Wait for the response to see if the user was deleted
		const response = await fetch(endpoint, options);

		if (response.status == 200) {
			router.reload(window.location);
		} else {
			// TODO: Display message saying the user could not be deleted
		}
	};

	// Custom input for the Select Roles dropdown to help with styling
	const CustomInput = styled(InputBase)(({ theme }) => ({
		"label + &": {
			marginTop: theme.spacing(3),
		},
		"& .MuiInputBase-input": {
			borderRadius: 4,
			width: 100,
			position: "relative",
			backgroundColor: theme.palette.background.paper,
			border: "1px solid #ced4da",
			fontSize: 16,
			padding: "10px 26px 10px 12px",
			height: "100%",
			// Use the system font instead of the default Roboto font.
			fontFamily: [
				"-apple-system",
				"BlinkMacSystemFont",
				'"Segoe UI"',
				"Roboto",
				'"Helvetica Neue"',
				"Arial",
				"sans-serif",
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(","),
			"&:focus": {
				borderRadius: 4,
				borderColor: "#80bdff",
				boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
			},
		},
	}));

	// Card component takes in props (React parameters) from users array
	const UserCard = (props) => (
		<>
			<CardContent sx={{ paddingBottom: 0 }}>
				<Grid container direction="column">
					<Grid item xs={6}>
						<Typography
							variant="userLabel"
							sx={{ marginBottom: 0.5 }}
						>
							Email
						</Typography>
						<Typography variant="body1" sx={{ marginBottom: 2 }}>
							{props.email}
						</Typography>
						<Typography
							variant="userLabel"
							sx={{ marginBottom: 0.5 }}
						>
							Password
						</Typography>
						<Typography variant="body1" sx={{ marginBottom: 2 }}>
							{props.password}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<form name={props.email} onSubmit={handleRole}>
							<Typography
								variant="userLabel"
								sx={{ marginBottom: 0.5 }}
							>
								Change Role
							</Typography>
							<br></br>
							<Select
								autoWidth
								defaultValue={props.roles}
								labelId="roles"
								id="roles"
								name="roles"
								input={<CustomInput />}
								label="Roles"
								sx={{ margin: 1, marginLeft: 0 }}
							>
								<MenuItem value={"Writer"}>Writer</MenuItem>
								<MenuItem value={"Copy-Editor"}>
									Copy-Editor
								</MenuItem>
								<MenuItem value={"Editor-In-Chief"}>
									Editor-In-Chief
								</MenuItem>
							</Select>

							<br></br>
							<Button
								sx={{ marginTop: 2 }}
								variant="contained"
								size="small"
								color="error"
								type="submit"
							>
								Change Role
							</Button>
						</form>
						<Box sx={{ marginTop: 2, marginRight: 2 }}>
							<Typography
								variant="userLabel"
								sx={{ marginBottom: 0.5 }}
							>
								Set Active
							</Typography>
							<Checkbox
								sx={{ marginTop: -0.5 }}
								color="error"
								name={props.email}
								required
								defaultChecked={props.active}
								onChange={handleActive}
							/>
						</Box>
					</Grid>
				</Grid>
			</CardContent>
			<Button
				name={props.email}
				sx={{
					position: "relative",
					marginTop: "18px",
					marginLeft: "16px",
					marginBottom: "20px",
				}}
				color="error"
				size="small"
				variant="contained"
				onClick={handleDelete}
			>
				Delete User
			</Button>
		</>
	);

	if (status === "authenticated" && allowedRoles.includes(data.user.role)) {
		return (
			<Box>
				<SplashHeader />

				<Box
					sx={{
						margin: "auto",
						width: "70%",
						height: "auto",
						paddingBottom: "0px",
					}}
				>
					<Accordion>
						<AccordionSummary>
							<Typography variant="userLabel">
								Create User
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Card
								variant="outlined"
								sx={{
									p: 1,
									margin: "auto",
									width: "70%",
									height: "auto",
								}}
							>
								<FormGroup sx={{ margin: "auto" }}>
									<form onSubmit={handleSubmit}>
										<Grid
											container
											sx={{
												display: "flex",
												flexDirection: "row",
											}}
										>
											<Grid item xs={4}>
												<Typography
													variant="managerPortalLabel"
													sx={{
														margin: 1,
														marginBottom: 0,
													}}
												>
													First Name
												</Typography>
												<TextField
													type="text"
													id="fname"
													label="First name"
													name="fname"
													variant="filled"
													required
													sx={{
														label: {
															color: "black",
														},
														input: {
															color: "black",
														},
														border: "1px solid black",
														borderRadius: "5px",
														margin: 1,
													}}
												></TextField>
												<br></br>
											</Grid>
											<Grid item xs={4}>
												<Typography
													variant="managerPortalLabel"
													sx={{
														margin: 1,
														marginBottom: 0,
													}}
												>
													Last Name
												</Typography>
												<TextField
													type="text"
													id="lname"
													label="Last name"
													name="lname"
													variant="filled"
													required
													sx={{
														label: {
															color: "black",
														},
														input: {
															color: "black",
														},
														border: "1px solid black",
														borderRadius: "5px",
														margin: 1,
													}}
												></TextField>
												<br></br>
											</Grid>

											<Grid item xs={4}>
												<Typography
													variant="managerPortalLabel"
													sx={{
														margin: 1,
														marginBottom: 0,
													}}
												>
													Email
												</Typography>
												<TextField
													type="text"
													id="email"
													label="Email"
													name="email"
													variant="filled"
													required
													sx={{
														label: {
															color: "black",
														},
														input: {
															color: "black",
														},
														border: "1px solid black",
														borderRadius: "5px",
														margin: 1,
													}}
												></TextField>
												<br></br>
											</Grid>
											<Grid item xs={4}>
												<Typography
													variant="managerPortalLabel"
													sx={{
														margin: 1,
														marginBottom: 0,
													}}
												>
													Password
												</Typography>
												<TextField
													type="password"
													id="password"
													label="Password"
													name="password"
													variant="filled"
													required
													sx={{
														label: {
															color: "black",
														},
														input: {
															color: "black",
														},
														border: "1px solid black",
														borderRadius: "5px",
														margin: 1,
													}}
												></TextField>
											</Grid>
											<Grid item xs={4}>
												<Typography
													variant="managerPortalLabel"
													sx={{
														margin: 1,
														marginBottom: 0,
													}}
												>
													Confirm Password
												</Typography>
												<TextField
													type="password"
													id="confirmPassword"
													label="Confirm Password"
													name="confirmPassword"
													variant="filled"
													required
													sx={{
														label: {
															color: "black",
														},
														input: {
															color: "black",
														},
														border: "1px solid black",
														borderRadius: "5px",
														margin: 1,
													}}
												></TextField>
											</Grid>
											<Grid item xs={4}>
												<Typography
													variant="managerPortalLabel"
													sx={{
														margin: 1,
														marginBottom: 0,
													}}
												>
													Roles
												</Typography>
												<br></br>
												<Select
													autoWidth
													defaultValue="none"
													labelId="roles"
													id="roles"
													name="roles"
													input={<CustomInput />}
													label="Roles"
													required
													sx={{ margin: 1 }}
												>
													<MenuItem
														value="none"
														disabled
													>
														Choose Role
													</MenuItem>
													<MenuItem value={"Writer"}>
														Writer
													</MenuItem>

													<MenuItem
														value={"Copy-Editor"}
													>
														Copy-Editor
													</MenuItem>
													<MenuItem
														value={
															"Editor-In-Chief"
														}
													>
														Editor-In-Chief
													</MenuItem>
												</Select>
											</Grid>
										</Grid>
										<Grid item xs={4}>
											<Button
												variant="contained"
												color="primaryButton"
												type="submit"
												size="medium"
												sx={{
													margin: 1,
													color: "white",
												}}
											>
												Create User
											</Button>
										</Grid>

										<br></br>
									</form>
									{isError === true && (
										<div>
											<Typography
												variant="h4"
												sx={{
													margin: 2,
													marginTop: 1,
													color: "red",
												}}
											>
												The passwords do not match
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
												New User has been created
											</Typography>
										</div>
									)}
									{isRole === false && (
										<div>
											<Typography
												variant="h4"
												sx={{
													margin: 1,
													marginTop: 1,
													color: "red",
												}}
											>
												No Role has been assigned
											</Typography>
										</div>
									)}
								</FormGroup>
							</Card>
						</AccordionDetails>
					</Accordion>
				</Box>

				<Box
					sx={{
						width: "60%",
						margin: "auto",
						display: "flex",
						flexDirection: "column",
						minHeight: "100vh",
					}}
				>
					<Typography variant="h3" sx={{ margin: 2 }}>
						User List
					</Typography>
					{getUsers.map((user) => (
						<Accordion sx={{ margin: 1 }}>
							<AccordionSummary>
								<Typography variant="userLabel">
									{user.fname} {user.lname}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Card
									key={user.email}
									variant="outlined"
									sx={{
										width: "80%",
										height: "auto",
										margin: 2,
										paddingBottom: "0px",
									}}
								>
									{
										<UserCard
											email={user.email}
											password={user.password}
											roles={user.roles}
											active={user.active}
										></UserCard>
									}
								</Card>
							</AccordionDetails>
						</Accordion>
					))}
				</Box>
			</Box>
		);
	} else {
		return (
			<Stack
				display="flex"
				spacing={2}
				justifyContent="center"
				alignItems="center"
			>
				<Typography variant="h2" color="black">
					Please sign in
				</Typography>
				<Button
					variant="contained"
					color="error"
					onClick={redirectToSignIn}
				>
					Sign In
				</Button>
			</Stack>
		);
	}
}
