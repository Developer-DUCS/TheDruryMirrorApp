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
import { Typography, Box } from '@mui/material';

export default function Home() {

	return (
		<Box sx={{backgroundColor: "#e0dcdc"}}>
			<Header/>
			<ArticleFeed/>
			<NavBar/>
		</Box>
	);
}