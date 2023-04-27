// AboutUsSplashPage
// Page Description:
//                 The splash page that displays on the about us page. Removes about us button from normal splash page
//Creation Date:
//                  By: Daniel Brinck,  Jan. 23, 2023
//
//Modificaiton Log:
//
//

import { Button, Grid, Typography } from "@mui/material";

import React, { useState } from "react";
import { useRouter } from "next/router";

export default function SplashHeader() {
	const router = useRouter();

	// Handle the log out button
	const logOut = async (event) => {
		router.push("/");
	};

	// Sends user back to splash page when clicking mirror logo
	const handleHome = () => {
		router.push(`${process.env.NEXT_PUBLIC_API_PATH}/Dashboard`);
	};

	return (
		<Grid
			container
			sx={{
				height: "9vh",
				marginBottom: 2,
				backgroundColor: "white",
				color: "black",
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center",
			}}
		>
			<Grid item xs={1}></Grid>
			<Grid item xs={7}>
				<Typography
					variant="logoHeader"
					sx={{ display: "flex", justifyContent: "center" }}
					onClick={handleHome}
				>
					Drury Mirror
				</Typography>
			</Grid>
			<Grid item xs={1}>
				<Button variant="outlined" color="error" onClick={logOut}>
					Log Out
				</Button>
			</Grid>
		</Grid>
	);
}
