import React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme, mainTheme } from "../styles/theme";

import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }) {
    // const { Component, pageProps } = props;
    const router = useRouter();
    console.log(router.pathname);

    let curTheme = theme;

    if (router.pathname !== "/") {
        curTheme = mainTheme;
    }

    if (router.pathname == "/testSplashPage") {
        curTheme = theme;
    }

    return (
        <React.Fragment>
            <Head>
                <title>Drury Mirror</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={curTheme}>
                <CssBaseline />
                <SessionProvider session={pageProps.session}>
                    <Component {...pageProps} />
                </SessionProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

// MyApp.propTypes = {
//     Component: PropTypes.func.isRequired,
//     pageProps: PropTypes.object.isRequired,
// };
