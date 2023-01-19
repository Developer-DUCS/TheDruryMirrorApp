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
} from "@mui/material";

export default function ArticleFeed() {
    const [getArticles, setArticles] = useState([]);

    useEffect(() => {
        async function FetchArticles() {
            // API endpoint where we send form data.
            const endpoint = "/api/GetArticles";

            // Form the request for sending data to the server.
            const options = {
                // The method is POST because we are sending data.
                method: "POST",
                // Tell the server we're sending JSON.
                headers: {
                    "Content-Type": "application/json",
                },
                // Body of the request is the JSON data we created above.
                body: JSONdata,
            };

            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options);
            const resData = await response.json();
            if (response.status == 200) {
                setArticles(resData.data);
            }
            else{
                console.log("Error: \n" + response.msg + " \n \n" + response.error)
            }
        }
    }, []);

    return <div></div>;
}
