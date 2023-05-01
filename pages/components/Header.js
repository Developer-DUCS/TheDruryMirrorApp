// ---------------------------------------------------
//
// NavBar.js
// - Navigation component at the bottom of the app
// - Uses next/link to handle navigation between pages
//
// Modification Log:
// 01 05 - Thomas O. created index.js
//
// ---------------------------------------------------

// System stuff
import React, { useEffect, useState, usePrevious } from "react";
import Link from "next/link";

// Styling
import {
	AppBar,
	Toolbar,
	Button,
	Typography,
	IconButton,
	Grid,
	TextField,
} from "@mui/material";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import { SafeArea } from "capacitor-plugin-safe-area";

export default function NavBar() {
	// For searcb bar display property
	const [getDisplay, setDisplay] = useState("none");

	// For search value
	const [getSearch, setSearch] = useState("");

	// To adjust header height
	const [getHeight, setHeight] = useState("55px");
	const [getSafePaddingTop, setSafePaddingTop] = useState(3);

	// On search click, set display property to block or none
	function onSearchButtonClick() {
		if (getDisplay == "none") {
			setDisplay("flex");
		}
		if (getDisplay == "flex") {
			setDisplay("none");
		}
		if (getHeight == "55px") {
			setHeight("100px");
		}
	}

	// This useEffect function automatically adjusts the paddingTop for the header
	useEffect(() => {
		SafeArea.getSafeAreaInsets().then(({ insets }) => {
			console.log(insets);
			setSafePaddingTop(insets.top + "px");
			console.log("Padding Top: ", getSafePaddingTop);
		});
	});

	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				width: "100%",
				marginBottom: 10,
			}}
		>
			<AppBar
				position="fixed"
				sx={{ backgroundColor: "#BC2932", height: { getHeight } }}
			>
				<Toolbar
					sx={{
						display: "flex",
						flexDirection: "column",
						paddingTop: getSafePaddingTop,
					}}
				>
					<Grid container>
						<Grid xs={11} sx={{ marginLeft: -2 }} item>
							<Link href="/">
								<Button
									variant="text"
									sx={{
										color: "white",
										fontSize: "24px",
										justifyContent: "space-around",
										fontFamily: "TrajanPro-Regular",
									}}
								>
									Drury Mirror
								</Button>
							</Link>
						</Grid>
						<Grid
							xs={1}
							item
							sx={{
								display: "flex",
								justifyContent: "space-around",
							}}
						>
							<IconButton
								edge="start"
								onClick={() => {
									onSearchButtonClick();
								}}
								sx={{ color: "white", display: "flex" }}
								aria-label="menu"
							>
								<SearchIcon />
							</IconButton>
						</Grid>
					</Grid>
					<TextField
						variant="filled"
						value={getSearch}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						sx={{
							display: getDisplay,
							m: 1,
							marginTop: 0,
							width: "99%",
							backgroundColor: "white",
							color: "black",
							borderRadius: 1,
							inputProps: {
								width: "99%",
								backgroundColor: "white",
								color: "black",
								borderRadius: 1,
								border: "0px black solid",
							},
						}}
					/>
				</Toolbar>
			</AppBar>
		</div>
	);
}
