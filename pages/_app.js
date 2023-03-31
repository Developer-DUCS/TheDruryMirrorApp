import '../styles/globals.css';
import Head from 'next/head';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css'; // Remove if nothing is visible
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { setupIonicReact } from '@ionic/react';

import { Provider } from "react-redux";
import store from "../store";

setupIonicReact();

import NonSSRWrapper from './components/NoSSRWrapper';

function MyApp({ Component, pageProps }) {
	return (
		<>
		<Provider store={store}>
				<Head>
					<title>Drury Mirror</title>
					<meta name="description" content="A mobile application for the Drury Mirror news organization" />
					<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<NonSSRWrapper>
					<Component {...pageProps} />
				</NonSSRWrapper>
		</Provider>
		</>
	);
}

export default MyApp;