import { HeaderBar } from '../Components/Header';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';

export function login() {

    const navigation = useNavigation();

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