import { Text, View, StyleSheet } from 'react-native';
import { Button, Card, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

function ArticleContainer(props) {

    // Load the custom Drury Mirror fonts...
    const [loaded] = useFonts({
        GaramondRegular: require('../assets/fonts/Garamond-Regular.ttf'),
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
        marginBottom: 15,
        borderColor: '#141414',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 25, height: 40 },
        shadowRadius: 5,
        elevation: 4,
        backgroundColor: 'white'
    },
    column: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
    },
    featuredImage: {
        width: 125,
        height: 125,
        borderRadius: 5,
        margin: 10,
    },
    headline: {
        width: 200,
        fontWeight: "bold",
        fontStyle: 'GaramondRegular',
        fontSize: 16,
        margin: 10,
        marginBottom: 0,
    },
    author: {
        width: 150,
        fontWeight: "bold",
        fontStyle: 'GaramondRegular',
        fontSize: 14,
        margin: 10,
        marginBottom: 10,
    },
    subtitle: {
        fontStyle: 'GaramondRegular',
        fontSize: 14,
        margin: 10,
        marginTop: 0,
        width: 200,
    },
});