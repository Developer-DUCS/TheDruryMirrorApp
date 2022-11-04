import { Text, View, StyleSheet } from 'react-native';
import { Button, Card, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

function ArticleContainer(props) {

    // Load the custom Drury Mirror fonts...
    const [loaded] = useFonts({
        GaramondRegular: require('../assets/fonts/Garamond-Regular.ttf'),
        TrajanPro: require('../assets/fonts/TrajanPro3Regular.ttf'),
        AvantGarde: require('../assets/fonts/AVGARDN_2.ttf'),
    });

    // If not loaded, don't load page (waits until fonts are loaded)
    if (!loaded) {
        return null;
    }


    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <Image source={props.image} style={styles.featuredImage} />
            </View>
            <View style={styles.column}>
                <Text style={styles.headline}>
                    {props.headline}
                </Text>
                <Text style={styles.author}>
                    {props.author}
                </Text>
                <Text style={styles.subtitle}>
                    {props.subtitle}
                </Text>
            </View>
        </View>
    )
}


export default ArticleContainer;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: 'auto',
        width: 'auto',
        margin: 15,
        marginBottom: 25,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 2,
        elevation: 8,
        backgroundColor: 'white'
    },
    column: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
    },
    featuredImage: {
        width: 120,
        height: 120,
        borderRadius: 5,
        margin: 10,
    },
    headline: {
        fontFamily: "AvantGarde",
        fontSize: 16,
        width: 200,
        margin: 10,
        marginBottom: 0,
    },
    author: {
        fontFamily: "AvantGarde",
        fontSize: 12,
        width: 150,
        margin: 10,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: 'AvantGarde',
        fontSize: 12,
        margin: 10,
        marginTop: 0,
        width: 200,
    },
});