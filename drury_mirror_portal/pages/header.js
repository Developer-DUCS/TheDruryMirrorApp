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
        <Box sx={{ height: "8vh", backgroundColor: "white", color: "black" }}>
            
            <Box xs={3}>
                <Button variant="contained" color="error" onClick={writeArticle}>
                    Write Article
                </Button>
            </Box>
            <Box xs={3}>
                <Button variant="contained" color="error" onClick={logOut}>
                    Log Out
                </Button>
            </Box>
            <Box xs={3}>
                <Button variant="contained" color="error" onClick={logOut}>
                    About Us
                </Button>
            </Box>
        </Box>
    );
}
