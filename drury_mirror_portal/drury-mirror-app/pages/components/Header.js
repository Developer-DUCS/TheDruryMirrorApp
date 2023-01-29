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
import React from "react";
import Link from "next/link";

// Styling
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    IconButton,
    Grid,
} from "@mui/material";

// Icons
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@mui/icons-material/Search";

export default function NavBar() {
    return (
        <div style={{ position: "absolute", top: 0, width: "100%" }}>
            <AppBar
                position="static"
                sx={{ backgroundColor: "#BC2932", height: "55px" }}>
                <Toolbar>
                    <Grid container>
                        <Grid
                            xs={11}
                            item>
                            <Link href="/">
                                <Button
                                    variant="text"
                                    sx={{
                                        color: "white",
                                        fontSize: "24px",
                                        justifyContent: "space-around",
                                        fontFamily: "TrajanPro-Regular",
                                    }}>
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
                            }}>
                            <IconButton
                                edge="start"
                                sx={{ color: "white", display: "flex" }}
                                aria-label="menu">
                                <SearchIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}
