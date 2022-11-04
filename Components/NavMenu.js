//Page Description:
//                  Navigation menu/footer
//Creation Date:
//                  By: Thomas O'Brien 10/25
//
//Modificaiton Log:
//                  10/25 Creation date
//                  10/30 Modified for testing of Navigation by Haley Saylor

import { Text, View, TouchableHighlight } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';

import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { useFonts } from 'expo-font';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';


export default function NavMenu() {
    const [loaded] = useFonts({
        fontello: require('../assets/fonts/fontello.ttf'),

    });

    const navigation = useNavigation();
    const FlagIcon =createIconSetFromFontello(fontelloConfig);

    function onRecentPress() {
        navigation.navigate("Home")
    }
    function onTestPress() {
        navigation.navigate('Test')
    }
    if (!loaded){
        return null;
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={onRecentPress} underlayColor="white">
                <View style={styles.button}>
                    <Icon
                        name='clock'
                        type='simple-line-icon'
                        color='white' />
                    <Text style={styles.buttonText}>
                        Recent
                    </Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={onTestPress} underlayColor='white'>
                <View style={styles.button}>
                    <Icon
                        name='globe'
                        type='simple-line-icon'
                        color='white' />
                    <Text style={styles.buttonText}>
                        Global
                    </Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={onTestPress} underlayColor='white'>
                <View style={styles.button}>
                    <FlagIcon
                        name='usa-flag-svgrepo-com'
                        color='white'
                        size={26}
                        style={{alignSelf:'center'}} />
                    <Text style={styles.buttonText}>
                        National
                    </Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={onTestPress} underlayColor='white'>
                <View style={styles.button}>
                    <Icon2
                        name='map-marker-radius-outline'
                        size={27}
                        color='white'/>
                    <Text style={styles.buttonText}>
                        Local
                    </Text>
                </View>
            </TouchableHighlight>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 65,
        width: Dimensions.get('window').width,        
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#BC2932',

    },
    button:{
        textAlign: 'center',
        width: 75,
        padding: 5,
        alignItems: 'center',
        backgroundColor: '#BC2932',

    },
    buttonText:{
        textAlign: 'center',
        padding: 3,
        color: 'white'
    }
})