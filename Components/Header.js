import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../Styles/Global';

export function HeaderBar()
{
    return(
        <View style = {[globalStyles.primaryContainer, headerStyles.headerContainer]}>
            <Text style ={globalStyles.TextLogo}>Drury Mirror</Text>
        </View>
    )
}

const headerStyles = StyleSheet.create ({
    headerContainer: {
        width: '100%',
        height: 50,
        color: '#fef9fb',
    }
});