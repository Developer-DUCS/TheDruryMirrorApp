import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme, mainTheme } from "../styles/theme";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();
  console.log(router.pathname);

  let curTheme = theme;

  if (router.pathname != "/") {
    curTheme = mainTheme;
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
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};
