//Page Description:
//                  Landing page for the mobile app. 
//Creation Date:
//                  By: Thomas O'Brien 10/25
//
//Modificaiton Log:
//                  10/25 Creation date
//

import { Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderBar from '../Components/Header';
import NavMenu from '../Components/NavMenu';
import ArticleListView from '../Components/ArticleListView';

import { useFonts } from 'expo-font';

function Home() {
    return (
        <View style={{flex: 1}}>
        
            <HeaderBar />
            <ScrollView><ArticleListView /></ScrollView>
            <NavMenu />
            
        </View>
    )
}

export default Home;