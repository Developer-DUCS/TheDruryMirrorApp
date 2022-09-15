import { Text, View } from 'react-native';

import { HeaderBar } from '../Components/Header';
import { TextEditor } from '../Components/TextEditor';

import { useFonts } from 'expo-font';

export function ArticleWritingPage()
{
    return(
        <View>
            <HeaderBar/>
            <View>
                <TextEditor></TextEditor>
            </View>
        </View>
    )
}