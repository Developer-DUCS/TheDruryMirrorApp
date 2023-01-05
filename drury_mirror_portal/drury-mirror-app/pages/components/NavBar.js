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
import { AppBar, Toolbar, Button, Typography, IconButton } from "@mui/material";

// Icons
import MenuIcon from "@material-ui/icons/Menu";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import RoomIcon from "@mui/icons-material/Room";
export default function NavBar() {
    return (
        <div style={{ position: "fixed", bottom: 1, width: "100%" }}>
            <AppBar
                position="static"
                sx={{ backgroundColor: "#BC2932", height: "65px", p: 1 }}>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Link href="/">
                        <IconButton
                            edge="start"
                            sx={{
                                m: 1,
                                marginButton: 0,
                                color: "white",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            aria-label="menu">
                            <QueryBuilderIcon />
                            <Typography sx={{ color: "white", m: 0 }}>
                                Recent
                            </Typography>
                        </IconButton>
                    </Link>
                    <Link href="/page2">
                        <IconButton
                            edge="start"
                            sx={{
                                m: 1,
                                marginButton: 0,
                                color: "white",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            aria-label="menu">
                            <LanguageIcon />
                            <Typography sx={{ color: "white", m: 0 }}>
                                International
                            </Typography>
                        </IconButton>
                    </Link>
                    <Link href="/page3">
                        <IconButton
                            edge="start"
                            sx={{
                                m: 1,
                                marginButton: 0,
                                color: "white",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            aria-label="menu">
                            <PublicIcon />
                            <Typography sx={{ color: "white", m: 0}}>
                                National
                            </Typography>
                        </IconButton>
                    </Link>
                    <Link href="/page4">
                        <IconButton
                            edge="start"
                            sx={{
                                m: 1,
                                marginButton: 0,
                                color: "white",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            aria-label="menu">
                            <RoomIcon />
                            <Typography sx={{ color: "white", m: 0 }}>
                                Local
                            </Typography>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}
