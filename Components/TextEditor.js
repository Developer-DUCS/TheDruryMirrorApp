// Components
import { StyleSheet, Text, View, Platform} from 'react-native';
import { Component, React} from 'react';
import { Input, Button } from 'react-native-elements';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// Styles
import * as Icon from "react-native-feather";
import { Entypo } from '@expo/vector-icons';
import { globalStyles } from '../Styles/Global';

export function TextEditor()
{
    
    return(
        <View>
            <View style={styles.articleInputs}>
                {/* Status View */}
                <View style = {styles.statusBar}>
                    <Button title="Admin" type="outline" />
                </View>
                {/* Headline View */}
                <View style = {styles.headlineView}>
                    <Input
                        placeholder = "Headline"
                        style = {styles.headlineInput}
                    />
                </View>
                {/* Rich Text Editor */}
                <View style = {styles.textEditor}>
                    <Editor></Editor>
                </View>
                {/* Links and Info for Citations */}
                <View style = {styles.citationsView}>
                    <Text style = {styles.citationsTitle}>Citations</Text>
                    <Input style = {styles.citationsInput} multiline></Input>
                </View>
                {/* Save Draft and Schedule Upload Buttons */}
            </View>
            <View style={styles.actionsBar}>
                <Button title="Save Draft" type="outline" style={styles.actionsItem}  />
                <Button title="Schedule Upload" type="outline" style={styles.actionsItem}  />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
        articleInputs:{
            padding: 3,
            marginLeft: 20,
            width: '80vw',
            display: 'inline-block',
        },
        statusBar: {
            alignItems: 'flex-start',
            margin: 5,
            marginBottom: 5,
        },
        statusItems: {
            borderRadius: 5,
            borderWidth: 1,
        },
        headlineView: {
            marginBottom: 10,
            marginTop: 10,
            marginLeft: -6,
        },
        headlineInput: {
            outlineStyle: 'none',
        },
        textEditor: {
            borderWidth: 1,
            borderRadius: 3,
            padding: 6,
            height: '80vh',
        },
        citationsView: {
            borderWidth: 1,
            borderRadius: 5,
            margin: 5,
            marginTop: 10,
            marginLeft: -1,
            width: '60vw',

        },
        citationsTitle: {
            fontSize: 18,
            fontStyle: 'bold',
            marginLeft: 5,
        },
        citationsInput: {
            outlineStyle: 'none',
        },
        actionsBar:{
            width: '40vh',
            alignItems: 'baseline',
            margin: 5,
            marginLeft: 20,
            flexDirection:'row',
            flex: 1,
        },
        actionsItem: {
            margin: 5,
            marginLeft: 0,
        }

  });