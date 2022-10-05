// ArticleList.js
// - Fetches all current articles from the database (including drafts, published, and copyediting phase)
// - Formats information from article row to article boxes/cards
//
// Documentation Template: 
// - Month/Day: Fname L. Details
//   - More details
//
// Documentation
// - 09/25: Thomas O. created the NavMenu javascript file

import { Text, View } from 'react-native';

import { HeaderBar } from '../Components/Header';
import { SourcesField } from '../Components/TextEditor';

import { useFonts } from 'expo-font';

export function ArticleList()
{
    return(
        <View>
            <HeaderBar/>
            <View>

            </View>
        </View>
    )
}