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

// LATER //
// AutoSave Function
// - Saves, or uploads, the current inputs from the text editor to the MySQL database
// - For convenience of the writer, so their current articles do not get lost
function AutoSave()
{

}

// Sprint 2
// SaveDraft Function
// - Called whenever the "Save Draft" button is clicked, uploads inputs in TextEditor to the MySQL database
// TODO: Add props for this function from current article inputs
// TODO: Connect to MySQL database
function SaveDraft()
{
    console.log("pressed saved draft");
    
}

// Sprint 2
// ScheduleUpload Function
// - Does the same as SaveDraft, except adds a date type data attribute to the row
// TODO: Add props for this function from current article inputs
// TODO: Connect to MySQL database
function ScheduleUpload()
{
    console.log("pressed schedule upload");
}

// TEXT EDITOR COMPONENT //
// - The TextEditor component includes the status, or role, the current user has.
// - It includes the Headline input, what the headline will be for the current article.
// - It includes the Editor component, imported from the React Draft.JS node module above.
// - It includes the Save Draft and Schedule Upload buttons, shown only to the Admin status.
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
                <Button title="Save Draft" 
                        type="outline" 
                        style={styles.actionsItem} 
                        onPress={() => SaveDraft()}  />
                <Button title="Schedule Upload" 
                        type="outline" 
                        style={styles.actionsItem}  
                        onPress={() => ScheduleUpload()}/>
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