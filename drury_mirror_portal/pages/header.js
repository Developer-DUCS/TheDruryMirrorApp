import {
	TextField,
	Button,
	FormGroup,
	Grid,
	Typography,
	Card,
	Toolbar,
	Box,
} from "@mui/material";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
// import { signOut } from "next-auth/client";

export default function Header() {
	const router = useRouter();

	// Handle the log out button
	const logOut = async (event) => {
		router.push("/");
	};

	const handleLogo = () => {
		router.push("/Dashboard");
	};

	// Handle the write draft button
	const writeDraftRoute = async (event) => {
		event.preventDefault();
		console.log("article id: ", event.currentTarget.id);
		router.push({
			pathname: "articleWriting",
			query: { id: event.currentTarget.id },
		});
	};

	// Handle the About Us button
	const handleAbout = () => {
		router.push("/about");
	};

	return (
		<Grid
			container
			sx={{
				height: "8vh",
				marginBottom: 2,
				backgroundColor: "white",
				color: "black",
				display: "flex",
			}}
		>
			<Grid item xs={3} sx={{ marginTop: 1 }}>
				<Button
					variant="text"
					sx={{
						fontSize: { lg: "18px", md: "16px", sm: "6px" },
						fontFamily: "Trajan",
					}}
					onClick={() => {
						handleLogo();
					}}
				>
					Drury Mirror
				</Button>
			</Grid>
			<Grid item xs></Grid>
			<Grid
				item
				xs
				sx={{
					marginTop: 1,
					fontSize: { lg: "16px", md: "12px", sm: "6px" },
				}}
			>
				<Button
					sx={{
						color: "white",
						marginRight: 2,
						fontSize: { lg: "16px", md: "12px", sm: "6px" },
						height: { lg: "40px", md: "30px", sm: "20px" },
					}}
					variant="contained"
					color="primaryButton"
					onClick={writeDraftRoute}
				>
					Write Draft
				</Button>
				<Button
					sx={{
						color: "white",
						marginRight: 2,
						fontSize: { lg: "16px", md: "12px", sm: "6px" },
						height: { lg: "40px", md: "30px", sm: "20px" },
					}}
					variant="contained"
					color="primaryButton"
					onClick={handleAbout}
				>
					About Us
				</Button>
				<Button
					variant="outlined"
					color="error"
					sx={{
						fontSize: { lg: "16px", md: "12px", sm: "6px" },
						height: { lg: "40px", md: "30px", sm: "20px" },
					}}
					onClick={() => signOut()}
				>
					Log Out
				</Button>
			</Grid>
		</Grid>
	);
}
