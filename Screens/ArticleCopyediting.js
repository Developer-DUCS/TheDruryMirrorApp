// Article Copyediting.js
// - A modified page of the ArticleWriting page, with an extra section for comments
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
import { TextCopyEditor } from '../Components/TextCopyEditor';

import { useFonts } from 'expo-font';

export function ArticleCopyEditingPage()
{
    return(
        <View>
            <HeaderBar/>
            <NavMenu/>
            <View>
                <TextCopyEditor></TextCopyEditor>
            </View>
        </View>
    )
}