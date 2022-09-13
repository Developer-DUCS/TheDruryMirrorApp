import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { HeaderBar } from './Components/Header';
import { globalStyleSheet } from './Styles/Global';

export default function App() {
  return (
    <View>
      <HeaderBar/>
      <View>
        <Text style = { globalStyleSheet.paragraph }>
          New York Times: King Charles III Expresses ‘Profound Sorrow’ Over Queen’s Death in First Speech
        </Text>
      </View>
    </View>
    
  );
}
