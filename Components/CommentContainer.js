// CommentContainer.js
// Created: 10/08/2022
// Purpose:
// - Used to display reference from article draft, comments made by copyeditor, comment object
//
// Modification Log:

// Components
import { StyleSheet, Text, View, Platform} from 'react-native';
import { Component, React, useState} from 'react';
import { Input, Button } from 'react-native-elements';

export function CommentContainer(props)
{

    

    return(
        <View styles={styles.CommentContainerStyle}>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    CommentContainerStyle: {
        width: '30vw',
        height: '20vh',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
    }
});