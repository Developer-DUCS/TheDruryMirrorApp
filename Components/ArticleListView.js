//Page Description:
//                  Pulls articles from the database
//Creation Date:
//                  By: Thomas O'Brien 10/25
//
//Modificaiton Log:
//                  10/25 Creation date
//

import { Text, View, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';

import ArticleContainer from './ArticleContainer'

// Static images
import image1 from '../assets/static-images/1.jpeg';
import image2 from '../assets/static-images/2.jpeg';
import image3 from '../assets/static-images/3.png';
import image4 from '../assets/static-images/4.jpeg';
import image5 from '../assets/static-images/5.jpeg';
import image6 from '../assets/static-images/6.jpg';


function ArticleListView() {

    const [articleData, setArticleData] = useState([])

    let articles = []

    let headlines = ["Blizzard Entertainment bids farewell to “Overwatch”",
        "“Werewolf by Night” Review",
        "Patagonia’s profits protect the planet",
        "The “Grand Theft Auto 6” Leak",
        "Review of Kelsea Ballerini’s “SUBJECT TO CHANGE”",
        "Disney Parks to Lift Covid Restrictions allowing Character hugs and more"
    ]
    let subtitles = ["“Overwatch” took the gaming world by",
        "“Werewolf by Night“, directed by Michael Giacchino",
        "One of America’s favorite experimental businesses",
        "Content leaks are not a rare thing in",
        "If it’s anyone who’s here to help you navigate",
        "Disney Parks travelers rejoice! You can now hug Mickey and his friends again"
    ]
    let authors = ["October 26, 2022 , by Sophia Meek",
        "October 16, 2022 , by Zoey Mueller",
        "October 13, 2022 , by Gisele Ortega",
        "October 10, 2022 , by Sophia Meek",
        "October 4, 2022 , by Gisele Ortega",
        "April 18, 2022 , by Marissa Mayfield"
    ]
    let images = [image1, image2, image3, image4, image5, image6]

    for (let i = 0; i < images.length; i++) {

        const currentArticle = (
            <ArticleContainer
                headline={headlines[i]}
                subtitle={subtitles[i] + "..."}
                author={authors[i]}
                image={images[i]}
                key={i}
            />
        )

        articles.push(currentArticle);
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View>
                {articles}
            </View>
        </ScrollView >
    )


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F1F1',
    },
});

export default ArticleListView;