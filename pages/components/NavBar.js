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
import React, { useEffect, useState, useCallback, useContext } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

// Styling
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { connect } from "react-redux";

import { SafeArea } from "capacitor-plugin-safe-area";

// Icons
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import RoomIcon from "@mui/icons-material/Room";

function NavBar(props) {
    const [getSafePaddingBtm, setSafePaddingBtm] = useState("");

	const router = useRouter();

    useEffect(() => {
        SafeArea.getSafeAreaInsets().then(({ insets }) => {
            console.log(insets);
            setSafePaddingBtm(insets.bottom + "px");
            console.log("Padding Top: ", getSafePaddingBtm);
        });

        SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
            console.log(statusBarHeight, "statusbarHeight");
        });
    });

    function handleRecent() {

        props.dispatch({ type: "SET_CURRENT_PAGE", payload: "Recent" });
        console.log("Changed to Recent: " + props.currentPage);
		if (router.pathname !== '/') {
			router.push('/');
		}
    }

    function handleLocal() {
        props.dispatch({ type: "SET_CURRENT_PAGE", payload: "Local" });
        console.log("Changed to Local: " + props.currentPage);
		if (router.pathname !== '/') {
			router.push('/');
		}
    }

    function handleNational() {
        props.dispatch({ type: "SET_CURRENT_PAGE", payload: "National" });
        console.log("Changed to National: " + props.currentPage);
		if (router.pathname !== '/') {
			router.push('/');
		}
    }

    function handleInternational() {
        props.dispatch({ type: "SET_CURRENT_PAGE", payload: "International" });
        console.log("Changed to International: " + props.currentPage);
		if (router.pathname !== '/') {
			router.push('/');
		}
    }

    return (
        <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "#BC2932",
                    height: "65px",
                    p: 1,
                    width: "100%",
                    paddingTop: 3,
                    paddingBottom: 7,
                }}>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingBottom: getSafePaddingBtm,
                    }}>
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
