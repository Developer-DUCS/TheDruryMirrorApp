// Splash Header
// Page Description:
//                 Custom header for the about page
//
//Creation Date:
//                  By: Haley Saylor
//
//Modificaiton Log:
//

import { Button, Grid, Typography } from "@mui/material";

import React from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function SplashHeader() {
	const router = useRouter();

	// Handle the About Us button
	const handleAbout = () => {
		router.push(`${process.env.NEXT_PUBLIC_API_PATH}/about`);
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
			<Grid item xs={1}>
				<Button
					sx={{ color: "white", marginRight: 2 }}
					variant="contained"
					color="primaryButton"
					onClick={handleAbout}
				>
					About Us
				</Button>
			</Grid>
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
				<Button
					variant="outlined"
					color="error"
					onClick={() => signOut()}
				>
					Log Out
				</Button>
			</Grid>
		</Grid>
	);
}
