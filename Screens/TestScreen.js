//Page Description:
//                  Testing page for navigation uses but can be modified for future screen use
//Creation Date:
//                  By: Haley Saylor 10/30
//Modification Log:
//                  10/30 Creation Date

import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../Components/Header';
import NavMenu from '../Components/NavMenu';

function Test(){
    return(
       <View>
        <Header/>
        <Text>"Test"</Text>
        <NavMenu/>

       </View> 
    )
}

export default Test;