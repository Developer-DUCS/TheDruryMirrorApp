import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    primaryContainer: {
        backgroundColor: '#101921',
        color: '#fef9fb',
    },
    TextLogo: {
        fontSize: 18,
        color: '#fef9fb',
        top: '25%',
        left: 5,
        position: 'relative',
    },
    paragraph: {
        fontSize: 12,
    },

// Tags

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
    },

  });