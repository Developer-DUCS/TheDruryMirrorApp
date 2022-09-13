import { StyleSheet, Text, View } from 'react-native';
import { globalStyleSheet } from '../Styles/Global';

export function HeaderBar()
{
    return(
        <View style = {[globalStyleSheet.primaryContainer, headerStyles.headerContainer]}>
            <Text style ={globalStyleSheet.TextLogo}>Drury Mirror</Text>
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