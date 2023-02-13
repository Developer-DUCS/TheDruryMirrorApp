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

    const handleLogo = () => {
        router.push("/testSplashPage");
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
            }}>
            <Grid
                item
                xs={4}
                sx={{ marginTop: 1 }}>
                <Button
                    variant="text"
                    sx={{
                        fontSize: { lg: "18px", md: "16px", sm: "14px" },
                        fontFamily: "Trajan",
                    }}
                    onClick={() => {
                        handleLogo();
                    }}>
                    Drury Mirror
                </Button>
            </Grid>
            <Grid
                item
                xs={8}
                sx={{
                    marginTop: 1,
                    fontSize: { lg: "16px", md: "14px", sm: "12px" },
                }}>
                <Button
                    sx={{ color: "white", marginRight: 2, fontSize: { lg: "16px", md: "14px", sm: "12px" } }}
                    variant="contained"
                    color="primaryButton"
                    onClick={writeDraftRoute}>
                    Write Draft
                </Button>
                <Button
                    sx={{
                        color: "white",
                        marginRight: 2,
                        fontSize: { lg: "16px", md: "14px", sm: "12px" },
                    }}
                    variant="contained"
                    color="primaryButton"
                    onClick={handleAbout}>
                    About Us
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ fontSize: { lg: "16px", md: "14px", sm: "12px" } }}
                    onClick={logOut}>
                    Log Out
                </Button>
            </Grid>
        </Grid>
    );
}
