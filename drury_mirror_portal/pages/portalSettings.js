// portalSettings.js
// Page Description:
//                  Page used to handle the settings for the portal
//                  This page is available for the Editor-In-Chief
//                  Here they can edit things like the tags available
//Creation Date:
//                  03/24/2023
//                  By: Samuel Rudqvist, Thomas Nield
//
//Modification Log:
//
//

import Header from "./header";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
	Stack,
	Typography,
	Button,
	Box,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Card,
	FormGroup,
	Grid,
	TextField,
} from "@mui/material";

export default function portalSettings() {
	const router = useRouter();
	const { status, data } = useSession();

	const allowedRoles = ["Editor-In-Chief", "Manager"];

	const [getTags, setTags] = useState([]);

	// Redirect the user to the log in screen
	const redirectToSignIn = (event) => {
		event.preventDefault();
		router.push(`${process.env.NEXT_PUBLIC_API_PATH}/`);
	};

	const addTag = async (event) => {
		event.preventDefault();
		let tag = event.target.newTag.value;
		const endpoint = "api/addTag";
		let data = {
			tag: tag,
		};
		let JSONdata = JSON.stringify(data);
		let options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSONdata,
		};

		let response = await fetch(endpoint, options);
		if (response.ok) {
			router.reload();
		} else {
		}
	};

	useEffect(() => {
		const getTagsRoute = async () => {
			const endpoint = "api/getTags";
			const response = await fetch(endpoint);

			if (response.ok) {
				let tags = await response.json();
				setTags(tags);
			} else {
			}
		};
		getTagsRoute();
	}, []);

	if (status === "authenticated" && allowedRoles.includes(data.user.role)) {
		return (
			<>
				<Header />
				<Typography variant="copyEditorHeader" sx={{ m: 2 }}>
					Portal Settings
				</Typography>
				<Box
					sx={{
						width: "70%",
						margin: "auto",
					}}
				></Box>
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
							<Typography variant="userLabel">Tags</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Grid
								container
								sx={{
									flexDirection: "row",
									alignItems: "flex-start",
								}}
							>
								<Grid item sx={{ marginRight: "20px" }}>
									{getTags.map((tag) => (
										<Typography
											variant="userLabel"
											key={tag}
											sx={{ display: "block" }}
										>
											{tag}
										</Typography>
									))}
								</Grid>
								<Grid item>
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
											<form onSubmit={addTag}>
												<Grid
													container
													sx={{
														display: "flex",
														flexDirection: "row",
													}}
												>
													<Grid item xs={9}>
														<Typography
															variant="managerPortalLabel"
															sx={{
																margin: 1,
																marginBottom: 0,
															}}
														>
															New Tag
														</Typography>
														<TextField
															type="text"
															id="newTag"
															label="New Tag"
															name="newTag"
															variant="filled"
															sx={{
																label: {
																	color: "black",
																},
																input: {
																	color: "black",
																},
																border: "1px solid black",
																borderRadius:
																	"5px",
																margin: 1,
															}}
														></TextField>
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
															Add Tag
														</Button>
													</Grid>
												</Grid>
											</form>
										</FormGroup>
									</Card>
								</Grid>
							</Grid>
						</AccordionDetails>
					</Accordion>
				</Box>
			</>
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
