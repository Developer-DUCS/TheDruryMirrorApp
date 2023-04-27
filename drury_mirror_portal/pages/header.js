import { Button, Grid } from "@mui/material";

import React from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function Header() {
	const router = useRouter();

	const handleLogo = () => {
		router.push(`${process.env.NEXT_PUBLIC_API_PATH}/Dashboard`);
	};

	// Handle the write draft button
	const writeDraftRoute = async (event) => {
		event.preventDefault();
		router.push({
			pathname: `${process.env.NEXT_PUBLIC_API_PATH}/articleWriting`,
			query: { id: event.currentTarget.id },
		});
	};

	// Handle the About Us button
	const handleAbout = () => {
		router.push(`${process.env.NEXT_PUBLIC_API_PATH}/about`);
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
						color: "black",
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
