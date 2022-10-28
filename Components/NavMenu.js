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


export function NavMenu()
{
    const navigation = useNavigation();

    function onRecentPress()
    {
        navigation.navigate("Home")
    }
    return(
        <View>
            <Button
                type="clear"
                onPress={() => onRecentPress()}
                icon={{
                    name:'clock',
                    type: 'simple-line-icons',
                    size: 24,
                    color: 'white',
                }}/>

        </View>
    )
}