import styles from "../styles/article.module.css";
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

export default function header() {
    const router = useRouter();

    // Handle the log out button
    const logOut = async (event) => {
        router.push("/");
    };

    return (
        <Grid container sx={{ height: "8vh", backgroundColor: "white", color: "black", display: "flex" }}>
            <Grid item xs={4} sx={{marginTop: 1}}>
                <Typography variant="logoHeader" sx={{ color: "black", paddingLeft: 2 }}>
                    Drury Mirror
                </Typography>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={2} sx={{marginTop: 1}}>
                <Button sx={{color: "white", marginRight: 2}} variant="contained" color="primaryButton" onClick={logOut}>
                    About Us
                </Button>
                <Button variant="contained" color="error" onClick={logOut}>
                    Log Out
                </Button>
            </Grid>
        </Grid>
    );
}
