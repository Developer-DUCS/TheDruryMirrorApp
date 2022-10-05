// Article Container
// - Contains text 

// Documentation Template: 
// - Month/Day: Fname L. Details
//   - More details
//
// Documentation
// - 09/29: Thomas O. created the ArticleContainer javascript file

import { StyleSheet, Text, View } from 'react-native';
import { Component, React, useState} from 'react';
import { HeaderBar } from '../Components/Header';
import { SourcesField } from '../Components/TextEditor';

import { useFonts } from 'expo-font';

export function ArticleContainer(props)
{

    const [getHeadline, setHeadline] = useState(null);
    if(getHeadline == null){ setHeadline(props.currentHeadline); } 

    const [getAuthor, setAuthor] = useState(null);
    if(getAuthor == null){ setAuthor(props.currentAuthor); } 

    const [getStatus, setStatus] = useState(null);
    if(getStatus == null){ setStatus(props.currentStatus); } 

    return(
        <View style={styles.container}>
            <Text style={styles.headline}>{getHeadline}</Text>
            <Text>Author: {getAuthor}</Text>
            <Text>Status: {getStatus}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '70vw',
        padding: 10,
        borderBottomWidth: 1,
    },
    headline:{
        fontSize: '24px',
        fontStyle: 'bold'
    }
});