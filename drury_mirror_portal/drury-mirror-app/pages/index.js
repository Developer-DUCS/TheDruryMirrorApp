// ---------------------------------------------------
// 
// Home.js
// - First screen users see after clicking on an app
// - Imports articles from Contentful CMS
// 
// Modification Log:
// 01 05 - Thomas O. created index.js
// 
// ---------------------------------------------------

// Component imports
import Head from 'next/head';
import NavBar from './components/NavBar'
import Header from './components/Header'
import ArticleFeed from './components/ArticleFeed';
import { Typography } from '@mui/material';

export default function Home() {

	return (
		<div>
			<Header/>
			<Typography sx={{color: "black", fontSize: "48px"}}>
				Test
			</Typography>
			<ArticleFeed/>
			<NavBar/>
		</div>
	);
}