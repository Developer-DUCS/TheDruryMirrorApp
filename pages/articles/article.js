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
import React, { useEffect, useState, useCallback } from "react";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";

import Link from "next/link";
import Image from "next/image";
import { debounce, forEach } from "lodash";

// Components
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import { Virtuoso } from "react-virtuoso";
import {
	IonAvatar,
	IonContent,
	IonItem,
	IonLabel,
	IonPage,
} from "@ionic/react";

// Styling
import {
	AppBar,
	Toolbar,
	Button,
	Typography,
	IconButton,
	Grid,
	Box,
	Card,
	CardContent,
	TextField,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@mui/icons-material/Search";

import DUIcon from "../../Lib/Images/DU-Small-Icon.png";
import { Router } from "next/router";

import { Profiler } from 'react';

function ArticleView(props) {

	const [getData, setData] = useState(null);

    useEffect(() => {
        
        function setArticleData(){
            console.log("Article Props: ", props.currentArticle.article)
			setData(props.currentArticle.article);
        }

        setArticleData();

    })
    

	if (getData) {
		const sanitizedHtml = getData.body.replace(/<\/?span>/g, "");
		console.log("Res Data", getData);

		// Check if the article has an image
		if (getData.thumbnailImage) {
			return (
				<Profiler id="Article View">
					<Box sx={{ backgroundColor: "#F3F3F3" }}>
						<Header />
						<Box sx={{ p: 2, marginTop: 8 }}>
							<Image src={getData.thumbnailImage} alt="thumbnail" />
							<Typography
								sx={{
									color: "black",
									fontFamily: "TrajanPro-Regular",
									fontSize: "28px",
								}}
							>
								{getData.headline}
							</Typography>
							<Typography
								sx={{
									color: "black",
									textIndent: "5%",
									textAlign: "justify",
									fontFamily: "Garamond-Regular",
									fontSize: "18px",
									marginTop: 2,
								}}
							>
								{sanitizedHtml}
							</Typography>
						</Box>
						<NavBar />
					</Box>
				</Profiler>
			);
		} else {
			return (
				<Box sx={{ backgroundColor: "#F3F3F3" }}>
					<Header />
					<Box sx={{ p: 2, marginTop: 8 }}>
						<Image
							alt="thumbnail"
							src={DUIcon.src}
							width="80"
							height="80"
						/>
						<Typography
							sx={{
								color: "black",
								fontFamily: "TrajanPro-Regular",
								fontSize: "28px",
							}}
						>
							{getData.headline}
						</Typography>
						<Typography
							sx={{
								color: "black",
								fontFamily: "Brown",
								fontSize: "14px",
								marginTop: 1,
								marginLeft: "4px",
							}}
						>
							By {getData.author}
						</Typography>
						<Typography
							sx={{
								color: "black",
								textIndent: "5%",
								textAlign: "justify",
								fontFamily: "Garamond-Regular",
								fontSize: "18px",
								marginTop: 2,
							}}
						>
							{ReactHtmlParser(getData.body)}
						</Typography>
					</Box>
					<NavBar />
				</Box>
			);
		}
	} else {
		return (
			<Box sx={{ backgroundColor: "#F3F3F3" }}>
				<Header />
				<Typography sx={{ color: "black", m: 1, marginTop: 10 }}>
					Loading...
				</Typography>
				<NavBar />
			</Box>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentArticle: state.article.currentArticle,
	};
};

export default connect(mapStateToProps)(ArticleView);