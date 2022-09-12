import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      
      <View style = {styles.headerContainer}>
        <Entypo name="menu" size={24} color="white" />
        <Text style = {styles.headerText}>Drury Mirror</Text>
      </View>
      
      <View style = {styles.tagsContainer}>
            <View style = {styles.tagHolder}>
              <Text style = {styles.tagText}>Article Tag</Text>
            </View>
            <View style = {styles.tagHolder}>
              <Text style = {styles.tagText}>Article Tag</Text>
            </View>
            <View style = {styles.tagHolder}>
              <Text style = {styles.tagText}>Article Tag</Text>
            </View>
            <View style = {styles.tagHolder}>
              <Text style = {styles.tagText}>Article Tag</Text>
            </View>
      </View>

      <View>
        {/* TO-DO: Title Style */}
        <Text>
          New York Times: King Charles III Expresses ‘Profound Sorrow’ Over Queen’s Death in First Speech
        </Text>
        {/* TO-DO: Sub-title Style */}
        <Text>
          His remarks capped a solemn day of remembrance after the death of his mother, Queen Elizabeth II. The country now enters a mourning period that continues until after her funeral.      
        </Text>
      </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerContainer:
  {
    backgroundColor: 'black',
    padding: 10,
    // display: 'block',
    //display: 1,
  },
  headerText: 
  {
    color: 'white',
    fontSize: 24,
    //margin: '12px',
  },

  tagsContainer: 
  {
    backgroundColor: 'red',
    alignSelf: 'center', 
    padding: 12,
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'row',

  },
  tagHolder:
  {
    padding: 12,
    margin: 5,
    borderRadius: 8,
    backgroundColor: 'white',
    maxWidth: '20%'
  },
  tagText:
  {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    justifyContent: 'center',
  }


});
