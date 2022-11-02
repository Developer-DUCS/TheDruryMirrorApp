//Page Description:
//                  Header bar with the Drury Mirror logo and search button/bar 
//Creation Date:
//                  By: Thomas O'Brien 10/25
//
//Modificaiton Log:
//                  10/25 Creation date
//                  10/29 Thomas O. added custom fonts, search button, styles

import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { React, useState, useEffect } from 'react'

import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

function Header() {

    // Load the custom Drury Mirror fonts...
    const [loaded] = useFonts({
        TrojanPro3Regular: require('../assets/fonts/TrajanPro3Regular.ttf'),
        GaramondReg: require('../assets/fonts/Garamond-Regular.ttf'),
    });

    // If not loaded, don't load page (waits until fonts are loaded)
    if (!loaded) {
        return null;
    }

    // Search Bar component that pops up when the search button was clicked
    const searchBar = () => {
        return (
            <View>

            </View>
        )
    }

    // When the search button is clicked, change style
    //const [isSearching, setIsSearching] = useState(false);
    // onSearchButtonClick = (event) => {
    //     event.target.style = styles.searchButtonHidden;
    //     //setIsSearching(true);
    // }

    // Updates style of searchBar and searchButton whenever isSearching changes state
    // useEffect(() => {

    // }, [isSearching]);


    return (
        <View style={styles.container}>
            <Text style={styles.logo} >Drury Mirror</Text>
            <Button
                style={styles.searchButton}
                icon={<Icon name="search" size={20} color="white" />}
                type="clear"
            />
        </View>
    )
}


export default Header;

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        height: 60,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#BC2932',
    },
    logo: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: "TrojanPro3Regular",
        marginLeft: 10,
    },
    searchButton: {
        color: '#FFFFFF',
        width: 10,
        height: 10,
    },
    searchButtonHidden: {
        display: 'none'
    },
    searchBar: {
        display: 'none',
        color: '#000000',
        width: 'auto',
        height: 15,
    }
});