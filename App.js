import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { HeaderBar } from './Components/Header';
import { TextEditor } from './Components/TextEditor';
import { globalStyles } from './Styles/Global';
import { useFonts } from 'expo-font';
import { TextInput } from "react-native";
import { Platform } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Garamond-Regular': require('./assets/fonts/Garamond-Regular.ttf')
  });

  return (
    <View>
      <HeaderBar/>
      <View>
        <Text style = { {fontFamily: 'Garamond-Regular'} }>
          New York Times: King Charles III Expresses ‘Profound Sorrow’ Over Queen’s Death in First Speech
        </Text>
      </View>
      <View>
        <TextEditor></TextEditor>
      </View>
    </View>
    
  );
}
