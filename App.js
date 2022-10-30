import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenStack } from 'react-native-screens';


import Home from './Screens/Home';
import Test from './Screens/TestScreen';
import { Entypo } from '@expo/vector-icons';
import { globalStyles } from './Styles/Global';
import { useFonts } from 'expo-font';

function App() {
  const AppStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <AppStack.Navigator screenOption={{ headerShown: false}}>
      <AppStack.Screen name='Home' component={Home}/>
      <AppStack.Screen name='Test' component={Test}/>
    </AppStack.Navigator>
    </NavigationContainer>
       
  );
}

export default App;