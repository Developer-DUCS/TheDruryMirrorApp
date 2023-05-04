// About
// Page Description:
//                 Showcases the developers of the Mirror application and website
//
//Creation Date:
//                  By: Thomas O'Brien
//
//Modificaiton Log:
//

import {
	Grid,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Box,
} from "@mui/material";

import SplashHeader from "./AboutUsSplashHeader";

export default function about() {
	return (
		<Box sx={{ height: "100%", backgroundColor: "#F3F3F3" }}>
			<SplashHeader />
			<Box sx={{ height: "100%", backgroundColor: "#F3F3F3" }}>
				<Box sx={{ marginLeft: "10%", paddingTop: 3, width: "50%" }}>
					<Typography sx={{ color: "black" }} variant="aboutHeader">
						Meet the team behind the Drury Mirror app and website
						portal.
					</Typography>
				</Box>
				<Box sx={{ marginLeft: "10%", marginTop: 4, width: "50%" }}>
					<Typography sx={{ color: "black" }} variant="aboutBold">
						We are Reflecting DUCS
					</Typography>
					<Typography variant="aboutBody">
						. Using the skills we learned at Drury University from
						the Computer Science department, we have developed a
						website portal for the Drury Mirror to create, edit, and
						publish articles for their brand new app. This allows
						Drury students to be informed and consume news.
					</Typography>
				</Box>
				<Box sx={{ paddingLeft: "10%", marginTop: 4 }}>
					<Typography sx={{ color: "black" }} variant="aboutHeader">
						Development Team
					</Typography>
				</Box>
				<Box
					sx={{
						paddingLeft: "10%",
						marginTop: 2,
						width: "auto",
						height: "30vh",
					}}
				>
					<Grid
						container
						columnSpacing={2}
						rowSpacing={2}
						sx={{
							paddingBottom: 3,
							display: "flex",
							backgroundColor: "#F3F3F3",
						}}
					>
						<Grid item>
							<Card sx={{ maxWidth: 210 }}>
								<CardMedia
									component="img"
									height="250"
									image="/images/TN.jpg"
									alt="Paella dish"
								/>
								<CardContent>
									<Typography variant="cardLabel">
										Thomas Nield
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Major: Computer Science
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Minor: Math & Cyber Risk Management
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Position: Technical Product Owner
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item>
							<Card sx={{ maxWidth: 210 }}>
								<CardMedia
									component="img"
									height="250"
									image="/images/TO.jpg"
									alt="Paella dish"
								/>
								<CardContent>
									<Typography variant="cardLabel">
										Thomas O'Brien
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Major: Software Engineering & Business
										Management
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Minor: Web Design
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Position: Technical Leader
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item>
							<Card sx={{ maxWidth: 210 }}>
								<CardMedia
									component="img"
									height="250"
									image="/images/SR.jpg"
									alt="Paella dish"
								/>
								<CardContent>
									<Typography variant="cardLabel">
										Samuel Rudqvist
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Major: Computer Science
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Minor: Cyber Risk Management
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Position: Developer
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item>
							<Card sx={{ maxWidth: 210 }}>
								<CardMedia
									component="img"
									height="250"
									image="/images/HS.jpg"
									alt="Paella dish"
								/>
								<CardContent>
									<Typography variant="cardLabel">
										Haley Saylor
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Major: Software Engineering & Writing
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Minor: Fine Arts
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Position: Developer
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item>
							<Card sx={{ maxWidth: 210 }}>
								<CardMedia
									component="img"
									height="250"
									image="/images/DB.jpg"
									alt="Paella dish"
								/>
								<CardContent>
									<Typography variant="cardLabel">
										Daniel Brinck
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Major: Cyber-Risk Management & Computer
										Software Engineering
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Minor: N/A
									</Typography>
									<br></br>
									<br></br>
									<Typography
										sx={{ marginTop: 2 }}
										variant="cardBody"
									>
										Position: Scrum Coach
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
}
