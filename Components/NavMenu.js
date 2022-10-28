// NavMenu.js
// - Navigation menu on the left side of the screen
// - Contains buttons for routing to different screens based on what was clicked
// - Only shown on the web version
//
// Documentation Template: 
// - Month/Day: Fname L. Details
//   - More details
//
// Documentation
// - 09/25: Thomas O. created the NavMenu javascript file
// - 10/7: Haley S. made onArticlePress and onArticleWritingPress Work with navigation

import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';

export function NavMenu()
{
    const navigation = useNavigation();
    // onArticlesPress
    // - Sends user to the ArticleList.js page
    function onArticlesPress()
    {
        navigation.navigate ("ArticleList");

    }

    // onArticleWritingPress
    // - Sends user to the Admin, Copyeditor, or Writer ArticleWriting view
    function onArticleWritingPress()
    {
        navigation.navigate ("ArticleWritingPage");
    }

    return(
        
            <View style={styles.NavGrid}>
            <View style={styles.NavItem}>
                <Button 
                    type="clear"
                    onPress={() => onArticlesPress()}
                    icon={{
                        name: 'list',
                        type: 'font-awesome',
                        size: 24,
                        color: 'white',
                      }}/>
            </View>
            <View style={styles.NavItem}>
                <Button 
                    type="clear"
                    onPress={() => onArticleWritingPress()}
                    icon={{
                        name: 'pencil',
                        type: 'entypo',
                        size: 24,
                        color: 'white',
                      }}
                      />
            </View>
            <View style={styles.NavItem}>
                <Button 
                    type="clear"
                    onPress={() => onArticlesPress()}
                    icon={{
                        name: 'users',
                        type: 'font-awesome-5',
                        size: 24,
                        color: 'white',
                      }}
                      />
            </View>
            <View style={styles.NavItem}>
                <Button 
                    type="clear"
                    onPress={() => onArticlesPress()}
                    icon={{
                        name: 'stats-chart',
                        type: 'ionicon',
                        size: 24,
                        color: 'white',
                      }}
                      />
            </View>
        </View>
    
    )
}

const styles = StyleSheet.create({
    NavGrid:{
        flex: 1,
        height: 50,
        flexDirection: "row",
        backgroundColor: '#1A2733',
    },
    NavItem: {
        width: 50,
        marginLeft: 16,
        marginTop: 5,
        marginBottom: 5,
    }
});