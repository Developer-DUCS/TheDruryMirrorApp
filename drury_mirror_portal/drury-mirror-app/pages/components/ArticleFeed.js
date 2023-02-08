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
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import Header from "./Header";
import NavBar from "./NavBar";

import { Virtuoso } from "react-virtuoso";
import {
    IonAvatar,
    IonContent,
    IonItem,
    IonLabel,
    IonPage,
} from "@ionic/react";

//
import DUIcon from "../../Lib/Images/DU-Small-Icon.png";

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
} from "@mui/material";

export default function ArticleFeed() {
    const [getMessage, setMessage] = useState("null");
    const [getArticles, setArticles] = useState([]);

    useEffect(() => {
        async function FetchArticles() {
            // API endpoint where we send form data.
            const endpoint = "/api/GetArticles";

            let payload = {
                message: "Sending request...,",
            };

            let JSONdata = JSON.stringify(payload);

            // Form the request for sending data to the server.
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSONdata,
            };

            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options);
            const resData = await response.json();
            if (response.status == 200) {
                setArticles(resData);
                setMessage(JSON.stringify(getArticles));
            } else {
                console.log(
                    "Error: \n" + response.msg + " \n \n" + response.error
                );
                setMessage(
                    "Error: \n" +
                        JSON.stringify(response.msg) +
                        " \n \n" +
                        JSON.stringify(response.error)
                );
            }
        }

        FetchArticles();
    }, []);

    function truncateString(str) {
        let truncated = str.slice(0, 25);
        if (str.length > 25) {
            truncated += "...";
        }
        return truncated;
    }

    const ArticleCard = (props) => {
        let thumbnail;

        if (props.article.thumbnailImage) {
            thumbnail = (
                <Image
                    alt="thumbnail"
                    src={`data:image;base64,${props.article.thumbnailImage}`}
                    width="80"
                    height="80"
                />
            );
        } else {
            thumbnail = (
                <Image
                    alt="thumbnail"
                    src={DUIcon.src}
                    width="80"
                    height="80"
                />
            );
        }

        let newHeadline = truncateString(props.article.headline);

        return (
            <Card
                sx={{
                    height: "120px",
                    m: "auto",
                    marginBottom: 2,
                    marginTop: 2,
                    width: "85%",
                    background: "#F0F0F0",
                }}>
                <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Box
                            item
                            sx={{  }}>
                            {thumbnail}
                        </Box>
                        <Box item sx={{marginLeft: 1}}>
                            <Typography
                                sx={{
                                    color: "black",
                                    fontFamily: "Brown-Regular",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    width: "80%",
                                }}>
                                {newHeadline}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "black",
                                    fontFamily: "Brown-Regular",
                                    fontSize: "18px",
                                    width: "60%",
                                }}>
                                By {props.article.author}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        );
    };

    const Feed = () => {
        return (
            <Box sx={{ marginTop: 10 }}>
                <IonPage>
                    <IonContent>
                        <Box sx={{ marginTop: 6 }}></Box>
                        <Virtuoso
                            totalCount={getArticles.length}
                            data={getArticles}
                            itemContent={(index, article) => {
                                return (
                                    <ArticleCard
                                        article={article}
                                        key={index}
                                    />
                                );
                            }}
                        />
                    </IonContent>
                </IonPage>
            </Box>
        );
    };

    return (
        <Box>
            <Header />
            <Feed />
            <NavBar />
        </Box>
    );
}
