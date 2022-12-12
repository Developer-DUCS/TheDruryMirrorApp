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

export default function Footer() {
    return (
        <Grid
            container
            sx={{
                height: "6vh",
                backgroundColor: "white",
                display: "flex",
                width: "100%",
                position: "fixed",
                bottom: 0,
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
            }}
        >
            <Grid item>
                <Typography variant="userLabel" sx={{ fontSize: "16px" }}>
                © Reflecting DUCS and Developer DUCS 2023 - Apache License 2.0
                </Typography>
            </Grid>
        </Grid>
    );
}
