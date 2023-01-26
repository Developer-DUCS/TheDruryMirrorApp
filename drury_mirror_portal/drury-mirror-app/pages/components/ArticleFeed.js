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

    const ArticleCard = (props) => {
        return (
            <Card sx={{ height: "150px", m: 5, width: "80%" }}>
                <CardContent>
                    <Typography
                        sx={{
                            color: "black",
                            fontFamily: "Brown-Regular",
                            fontSize: "24px",
                            fontWeight: "bold",
                        }}>
                        {props.article.headline}
                    </Typography>
                </CardContent>
            </Card>
        );
    };

    return (
        <Box sx={{ marginTop: 10 }}>
            <IonPage>
                <Header />
                <IonContent>
                    <Virtuoso
                        style={{ height: "100%" }}
                        data={getArticles}
                        itemContent={(index, article) => {
                            return (
                                <ArticleCard
                                    key={index}
                                    article={article}
                                />
                            );
                        }}
                    />
                </IonContent>
                <NavBar />
            </IonPage>
        </Box>
    );
}
