//Page Description:
//                  Header bar with the Drury Mirror logo and search button/bar 
//Creation Date:
//                  By: Thomas O'Brien 10/25
//
//Modificaiton Log:
//                  10/25 Creation date
//                  10/29 Thomas O. added custom fonts, search button, styles

//import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Easing, Text, View, StyleSheet, TextInput } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import React, { useState } from 'react'


import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

function Header() {
    // When the search button is clicked, change style
    const [isOpen, setIsOpen] = useState(false);

    // Save query
    const [getSearchQuery, setSearchQuery] = useState("")

    // Animation stuff
    // const animation = useSharedValue({ width: 'auto', height: 0 })
    // const animationStyle = useAnimationStyle(() => {
    //     return {
    //         height: withTiming(animation.value.height, {
    //             duration: 500
    //         }),
    //     }
    // })

    // Load the custom Drury Mirror fonts...
    const [loaded] = useFonts({
        TrojanPro3Regular: require('../assets/fonts/TrajanPro3Regular.ttf'),
        GaramondReg: require('../assets/fonts/Garamond-Regular.ttf'),
    });

    // If not loaded, don't load page (waits until fonts are loaded)
    if (!loaded) {
        return null;
    }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.logo} >Drury Mirror</Text>
                <Button
                    style={styles.searchButton}
                    icon={<Icon name="search" size={20} color="white" />}
                    type="clear"
                    onPress={() => setIsOpen(!isOpen)}
                />
            </View>
            <View style={styles.searchBarContainer}>
                {isOpen ? (
                    <Input
                        containerStyle={{}}
                        errorStyle={{}}
                        errorProps={{}}
                        inputStyle={{ color: "black" }}
                        placeholder="Search for..."
                    />) : null}
            </View>
        </View>
    )
}


export default Header;

const styles = StyleSheet.create({
    searchBarContainer: {
        color: 'black'
    },
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
        display: 'none',
        color: '#black',
        width: 'auto',
        height: 0,
    },
    searchBar: {
        display: 'flex',
        color: 'black',
        width: 'auto',
        height: 15,
    }
});