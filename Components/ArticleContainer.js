import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
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

        </View>
    )
}


export default ArticleContainer;

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#BC2932',
    }
});