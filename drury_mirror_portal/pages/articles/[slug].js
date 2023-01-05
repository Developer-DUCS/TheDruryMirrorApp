// -----------------------------------------------------------
//
// [slug].js
// - Handles dynamic routing and pages for articles
//
//  -----------------------------------------------------------
//
// Modification Log:
//
//
const contentful = require("contentful-management");

import {
    Typography,
    Box,
    Button,
    Card,
    CardHeader,
    CardContent,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";

import Router, { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ReactMarkdown from "react-markdown";

import Header from "../Components/Header";

export default function Article({ resData }) {
    if (resData) {
        return (
            <Box>
                <Header />
            </Box>
        );
    } else {
        return (
            <Box>
                <Header />
            </Box>
        );
    }
}

// Returns a list of acceptable parameters for slug (dynamic routing for articles)
// - getStaticPaths is part of next.js's server-sider-rendering feature
// - completely safe to have server code in this function
export async function getStaticPaths() {
    const client = contentful.createClient({
        accessToken: "CFPAT-r1ZzcvV18KpPzLm7dhrNJlMngdzJf-xlYlgcw6QfIe4",
    });

    let resData = [];

    // 1. Set up client to retreive class entries
    let spaceID = process.env.CONTENTFUL_SPACE_ID
    client.getSpace(spaceID).then((space) => {
        space.getEnvironment("master").then((environment) => {
            environment
                .getEntries({
                    content_type: "article",
                })
                .then((response) => {
                    let articles = [];

                    response.items.forEach((element) => {
                        articles.push(element.fields.slug);
                    });

                    resData = articles;
                });
        });
    });

    const paths = resData.map((slug) => ({ params: { slug } }));

    return {
        paths,
        fallback: true,
    };
}

// Fetch necessary data for the article post using params.slug
// - getStaticProps is part of next.js's server-sider-rendering feature
// - completely safe to have server code in this function
export async function getStaticProps({ params }) {
    console.log("On Slug: " + params.slug);

    // Prepare payload
    let data = {
        slug: params.slug,
    };

    let payload = JSON.stringify(data);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: payload,
    };

    const endpoint = "/api/contentful/GetArticleBySlug";

    // Send a POST request to GetArticleBySlug with body of {slug}
    let response = await fetch(endpoint, options);
    let resData = await response.json();

    // Return article data fetched from API endpoint
    return {
        props: {
            resData,
        },
    };
}
