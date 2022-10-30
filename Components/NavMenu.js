//Page Description:
//                  Navigation menu/footer
//Creation Date:
//                  By: Thomas O'Brien 10/25
//
//Modificaiton Log:
//                  10/25 Creation date
//

import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Dimensions } from 'react-native';


export default function NavMenu() {
    const navigation = useNavigation();

    function onRecentPress() {
        navigation.navigate("Home")
    }
    function onTestPress() {
        navigation.navigate('Test')
    }

    return (
        <View style={styles.container}>
            <Button
                type="clear"
                onPress={() => onRecentPress()}
                icon={{
                    name: 'clock',
                    type: 'simple-line-icon',
                    size: 24,
                    color: 'white',
                }} />
                <Button
                    type="clear"
                    onPress={()=> onTestPress()}
                    icon={{
                        name: 'globe',
                        type: 'simple-line-icon',
                        size: 24,
                        color: 'white',
                    }}

                />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#BC2932',

    }
})