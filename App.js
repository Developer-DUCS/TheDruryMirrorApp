import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { Home } from './Screens/Home';

import { Entypo } from '@expo/vector-icons';
import { globalStyles } from './Styles/Global';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Garamond-Regular': require('./assets/fonts/Garamond-Regular.ttf')
  });

  return (
    <View>
      <ArticleCopyEditingPage></ArticleCopyEditingPage>
    </View>
    
  );
}
