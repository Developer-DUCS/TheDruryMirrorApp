import { Text, View } from 'react-native';

import { HeaderBar } from '../Components/Header';
import { HeadlineField } from '../Components/TextEditor';
import { TextEditor } from '../Components/TextEditor';
import { SourcesField } from '../Components/TextEditor';

import { useFonts } from 'expo-font';

export function ArticleWritingPage()
{
    return(
        <View>
            <HeaderBar/>
            <View>
                <HeadlineField></HeadlineField>
                <TextEditor></TextEditor>
                <SourcesField></SourcesField>
            </View>
        </View>
    )
}