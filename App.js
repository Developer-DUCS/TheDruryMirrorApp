import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ArticleWritingPage } from './Screens/ArticleWriting';
import { ArticleList } from './Screens/ArticleList';
import { login } from './Screens/login';


import { Entypo } from '@expo/vector-icons';
import { globalStyles } from './Styles/Global';
import { useFonts } from 'expo-font';
import { ScreenStack } from 'react-native-screens';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Garamond-Regular': require('./assets/fonts/Garamond-Regular.ttf')
  });
  const AppStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <AppStack.Navigator screenOptions={{ headerShown: false}}>
                <AppStack.Screen name='login' component = {login}/>
                <AppStack.Screen name='ArticleWritingPage' component = {ArticleWritingPage} />
                <AppStack.Screen name='ArticleList' component = {ArticleList} />
            </AppStack.Navigator> 
    </NavigationContainer>   
  );
}
