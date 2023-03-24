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

export default function SplashHeader() {
    const router = useRouter();

    // Handle the log out button
    const logOut = async (event) => {
        router.push("/");
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

    // Sends user back to splash page when clicking mirror logo
    const handleHome = () => {
        router.push("/Dashboard");
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
                alignItems: "center"
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
                    sx={{ display: "flex", justifyContent: "center"}}
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
