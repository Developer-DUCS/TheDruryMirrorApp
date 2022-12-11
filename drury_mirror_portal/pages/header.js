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

export default function Header() {
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
        router.push("/about")
    }

    return (
        <Grid container sx={{ height: "8vh", marginBottom: 2, backgroundColor: "white", color: "black", display: "flex" }}>
            <Grid item xs={3} sx={{marginTop: 1}}>
                <Typography variant="logoHeader" sx={{ color: "black", paddingLeft: 2 }}>
                    Drury Mirror
                </Typography>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={3} sx={{marginTop: 1}}>
                <Button sx={{color: "white", marginRight: 2}} variant="contained" color="primaryButton" onClick={writeDraftRoute}>
                    Write Draft
                </Button>
                <Button sx={{color: "white", marginRight: 2}} variant="contained" color="primaryButton" onClick={handleAbout}>
                    About Us
                </Button>
                <Button variant="outlined" color="error" onClick={logOut}>
                    Log Out
                </Button>
            </Grid>
        </Grid>
    );
}
