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

import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';

export function NavMenu()
{
    // onArticlesPress
    // - Sends user to the ArticleList.js page
    function onArticlesPress()
    {

    }

    // onArticleWritingPress
    // - Sends user to the Admin, Copyeditor, or Writer ArticleWriting view
    function onArticleWritingPress()
    {

    }

    return(
        <View>
            <View>
                <Button title="Schedule Upload" 
                    type="solid"
                    onPress={() => onArticlesPress()}/>
            </View>
        </View>
    )
}

