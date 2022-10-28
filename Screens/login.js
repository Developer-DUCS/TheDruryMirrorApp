//login.js
//A login screen
// - A very simple login screen for navigation purposes
//Creation Date:
//      By: Haley Saylor Oct. 7 2022

import { HeaderBar } from '../Components/Header';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';

export function login() {

    const navigation = useNavigation();
    //onloginPress
    //Sends user to Default Article Writing Page
    function onloginPress()
    {
        navigation.navigate ("ArticleWritingPage");

    }

    return(
        <View>
            <HeaderBar/>
            <Button
                    onPress={() => onloginPress()}
                      />
        </View>

    )
}