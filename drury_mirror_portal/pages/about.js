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
        <Box sx={{ height: "100%",backgroundColor: "#F3F3F3" }}>
            <Header />
            <Box sx={{ height: "100%", backgroundColor: "#F3F3F3" }}>
                <Box sx={{ marginLeft: "10%", paddingTop: 3, width: "50%" }}>
                    <Typography sx={{ color: "black" }} variant="aboutHeader">
                        Learn about how we are bringing innovation to the Drury
                        Community and to Drury Mirror.
                    </Typography>
                </Box>
                <Box sx={{ marginLeft: "10%", marginTop: 4, width: "50%" }}>
                    <Typography sx={{ color: "black" }} variant="aboutBold">
                        We are Reflecting DUCS
                    </Typography>
                    <Typography variant="aboutBody">
                        , the development team behind the Drury Mirror website
                        and mobile app. We utilize cutting-edge full-stack
                        development technology to bring together an entire
                        website for Drury Mirror and a brand new mobile app for
                        Drury students.
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
                    <Grid container columnSpacing={2} rowSpacing={2} sx={{ paddingBottom: 3, display: "flex", backgroundColor: "#F3F3F3" }}>
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
