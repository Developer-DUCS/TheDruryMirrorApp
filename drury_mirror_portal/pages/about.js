//import styles from '../styles/article.module.css'
import {
    TextField,
    Button,
    FormGroup,
    Grid,
    Typography,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Toolbar,
    Box,
} from "@mui/material";

import { useRouter } from "next/router";

import Header from "./header";

export default function about() {
    return (
        <Box sx={{ height: "100%", backgroundColor: "#F3F3F3" }}>
            <Header />
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
                        Drury students to be informed and consume news
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
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image="/images/cup.PNG"
                                    alt="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="cardLabel">
                                        Thomas Nield
                                    </Typography>
                                    <br></br>
                                    <Typography
                                        sx={{ marginTop: 2 }}
                                        variant="cardBody"
                                    >
                                        Senior
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image="/images/cup.PNG"
                                    alt="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="cardLabel">
                                        Thomas O'Brien
                                    </Typography>
                                    <br></br>
                                    <Typography
                                        sx={{ marginTop: 2 }}
                                        variant="cardBody"
                                    >
                                        Senior
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image="/images/cup.PNG"
                                    alt="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="cardLabel">
                                        Sam
                                    </Typography>
                                    <br></br>
                                    <Typography
                                        sx={{ marginTop: 2 }}
                                        variant="cardBody"
                                    >
                                        Senior
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image="/images/cup.PNG"
                                    alt="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="cardLabel">
                                        Haley
                                    </Typography>
                                    <br></br>
                                    <Typography
                                        sx={{ marginTop: 2 }}
                                        variant="cardBody"
                                    >
                                        Senior
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image="/images/cup.PNG"
                                    alt="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="cardLabel">
                                        Daniel
                                    </Typography>
                                    <br></br>
                                    <Typography
                                        sx={{ marginTop: 2 }}
                                        variant="cardBody"
                                    >
                                        Senior
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
