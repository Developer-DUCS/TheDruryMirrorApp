//Page Description:
//                  Container for Screens and Navigation Stack
//Creation Date:
//                  By: Thomas O'Brien 10/25
//Modification Log:
//                  10/25 Creation Date
//                  10/30 Modified for Navigation use by Haley Saylor

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
          <AppStack.Navigator>
            <AppStack.Group
              screenOptions={{headerShown:false}}>
          <AppStack.Screen name='Home' component={Home} />
          <AppStack.Screen name='Test' component={Test} />
          </AppStack.Group>
       </AppStack.Navigator>
     </NavigationContainer>
    
  );
}

export default App;