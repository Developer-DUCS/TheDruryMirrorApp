// Article Writing.js
// - Page the writer uses for article entry, save draft, etc.
// - Separated from Copyeditors view and Admin views
//
// Documentation Template: 
// - Month/Day: Fname L. Details
//   - More details
//
// Documentation
// - 09/25: Thomas O. added documentation, file created 09/16

import { Text, View } from 'react-native';

import { HeaderBar } from '../Components/Header';
import { NavMenu } from '../Components/NavMenu';
import { TextEditor } from '../Components/TextEditor';
import { SourcesField } from '../Components/TextEditor';

import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

export function ArticleWritingPage()
{
    
    return(
        
        <View>
            <HeaderBar/>
            <NavMenu/>
            <View>
                <TextEditor></TextEditor>
            </View>
        </View>
    
    )
}
