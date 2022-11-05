import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';

export default function MyApp(props) {
const { Component, pageProps } = props;

return (
    <React.Fragment>
      <Head>
          <title>Drury Mirror</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
      < CssBaseline />
          <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
);
}

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
};