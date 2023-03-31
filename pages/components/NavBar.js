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
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { connect } from "react-redux";

// Icons
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import RoomIcon from "@mui/icons-material/Room";

function NavBar(props) {
    function handleRecent() {
        props.dispatch({ type: "SET_CURRENT_PAGE", payload: "Recent" });
        console.log("Changed to Recent: " + props.currentPage);
    }

    function handleLocal() {
        props.dispatch({ type: "SET_CURRENT_PAGE", payload: "Local" });
        console.log("Changed to Local: " + props.currentPage);
    }

    function handleNational() {
        props.dispatch({ type: "SET_CURRENT_PAGE", payload: "National" });
        console.log("Changed to National: " + props.currentPage);
    }

    function handleInternational() {
        props.dispatch({ type: "SET_CURRENT_PAGE", payload: "International" });
        console.log("Changed to International: " + props.currentPage);
    }

    return (
        <div style={{ position: "fixed", bottom: 1, width: "100%" }}>
            <AppBar
                position="static"
                sx={{ backgroundColor: "#BC2932", height: "65px", p: 1, width: "100%" }}>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Link href={`/`}>
                        <IconButton
                            edge="start"
                            sx={{
                                m: 1,
                                marginButton: 0,
                                color: "white",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            onClick={handleRecent}
                            aria-label="menu">
                            <QueryBuilderIcon />
                            <Typography
                                sx={{ color: "white", m: 0, fontSize: "14px" }}>
                                Recent
                            </Typography>
                        </IconButton>
                    </Link>
                    <IconButton
                        edge="start"
                        sx={{
                            m: 1,
                            marginButton: 0,
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        onClick={handleLocal}
                        aria-label="menu">
                        <LanguageIcon />
                        <Typography
                            sx={{ color: "white", m: 0, fontSize: "14px" }}>
                            Local
                        </Typography>
                    </IconButton>
                    <IconButton
                        edge="start"
                        sx={{
                            m: 1,
                            marginButton: 0,
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        onClick={handleNational}
                        aria-label="menu">
                        <PublicIcon />
                        <Typography
                            sx={{ color: "white", m: 0, fontSize: "14px" }}>
                            National
                        </Typography>
                    </IconButton>
                    <IconButton
                        edge="start"
                        sx={{
                            m: 1,
                            marginButton: 0,
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        onClick={handleInternational}
                        aria-label="menu">
                        <RoomIcon />
                        <Typography
                            sx={{ color: "white", m: 0, fontSize: "14px" }}>
                            International
                        </Typography>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.article.currentPage,
    };
};

export default connect(mapStateToProps)(NavBar);
