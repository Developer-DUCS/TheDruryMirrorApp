import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../Components/Header';
import NavMenu from '../Components/NavMenu';

function Test(){
    return(
       <View>
        <Text>"Test"</Text>
        <NavMenu/>

       </View> 
    )
}

export default Test;