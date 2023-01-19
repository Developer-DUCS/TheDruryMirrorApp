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

// Styling
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    IconButton,
    Grid,
    Box
} from "@mui/material";

export default function ArticleFeed() {
    const [getArticles, setArticles] = useState([]);
    const [getMessage, setMessage] = useState("");

    useEffect(() => {
        async function FetchArticles() {
            // API endpoint where we send form data.
            const endpoint = "/api/GetArticles";

            let payload = {
                message: "Sending request...,"
            }

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
                setArticles(resData.data);
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

    const Feed = () => {
        if (getMessage != "") {
            return (
            <Box>
                <Typography sx={{color: "black", fontSize: "20px"}}>
                    Cards:
                </Typography>
            </Box>
            );
        } else {
            return <Typography sx={{color: "black"}}>{getMessage}</Typography>;
        }
    };

    return (
        <Box sx={{marginTop: 30}}>
            <Box sx={{marginTop: 30}}>
                <Feed />
            </Box>
        </Box>
    );
}
