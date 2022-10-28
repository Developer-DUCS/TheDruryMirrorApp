// ArticleList.js
// - Fetches all current articles from the database (including drafts, published, and copyediting phase)
// - Formats information from article row to article boxes/cards
//
// Documentation Template: 
// - Month/Day: Fname L. Details
//   - More details
//
// Documentation
// - 09/25: Thomas O. created the NavMenu javascript file


import { StyleSheet, Text, View } from 'react-native';
import { Component, React, useState} from 'react';
import { HeaderBar } from '../Components/Header';
import { NavMenu} from '../Components/NavMenu';
import { ArticleContainer } from '../Components/ArticleContainer';

import { SourcesField } from '../Components/TextEditor';
import { useFonts } from 'expo-font';

export function ArticleList()
{
    const [fetchedArticles, setFetchedArticles] = useState(false);

    let articleData = [];

    // FetchArticleData
    // - Async function that reads rows from the MySQL database
    // - Builds 'articleData' array by inputting arrays of the article's data
    // TODO: Link up to database, implement fetch functionality
    function fetchArticleData()
    {
        if(fetchedArticles == false){
            const testData = ["Headline", "First Last", "Saved Draft", "ID: 0"]
            articleData.push(testData);
            setFetchedArticles(true);
        }
    }

    let articleList = [];
    
    // PopulatePage
    // - From the articleData array, an ArticleContainer component is created with props
    //   from the data in articleData, then pushed to articleList
    // - articleList is returned
    function populatePage()
    {
        const article = (
            <ArticleContainer 
            style={styles.container}
            currentHeadline = "Headline"
            currentAuthor = "First Last"
            currentStatus = "Saved Draft"/> 
            )

        return article;
        fetchArticleData();

        if(articleData !== null){

            articleData.forEach(function (item, index){

                const article = (
                <ArticleContainer 
                key={item[3]}
                style={styles.container}
                currentHeadline = {item[0]}
                currentAuthor = {item[1]}
                currentStatus = {item[2]}/> )

                articleList.push(article);
            })
        }
        
        return articleList;
    }

    return(
        <View>
            <HeaderBar/>
            <NavMenu/>
            <View style={styles.container}>
                {populatePage()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '70vw',
        display: 'flex',
        margin: 15,
        leftMargin: 10,
    }
});