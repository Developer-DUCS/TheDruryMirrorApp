// Components
import { StyleSheet, Text, View, Platform} from 'react-native';
import { Component, React, useState} from 'react';
import { Input, Button } from 'react-native-elements';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import  DtPicker  from 'react-calendar-datetime-picker'
//import 'react-calendar-datetime-picker/dist/index.css'
import { convertToRaw, convertFromRaw, EditorState, ContentState } from 'draft-js';
//import 'draft-js';
// Styles
import * as Icon from "react-native-feather";
import { Entypo } from '@expo/vector-icons';
import { globalStyles } from '../Styles/Global';
import { text } from 'body-parser';




// TEXT EDITOR COMPONENT //
// - The TextEditor component includes the status, or role, the current user has.
// - It includes the Headline input, what the headline will be for the current article.
// - It includes the Editor component, imported from the React Draft.JS node module above.
// - It includes the Save Draft and Schedule Upload buttons, shown only to the Admin status.
export function TextEditor()
{
    const [contentState, setContentState] = useState({}) // ContentState JSON
    
 
    // Sprint 2
    // SaveDraft Function
    // - Called whenever the "Save Draft" button is clicked, uploads inputs in TextEditor to the MySQL database
    // TODO: Add props for this function from current article inputs
    // TODO: Connect to MySQL database
    async function SaveDraft()
    {
        // Upload json to MysQL database
        console.log("pressed saved draft2");

        // send post data to sql server
        const url = "http://127.0.0.1:3000/Api/SaveArticle";

        // Get the data from the text editor
        let ourJsonObj = contentState;
        // Find the "text" field of the json object contentState
        let textField = ourJsonObj["blocks"][0]["text"];
        let data = {
            "article": textField
        }


        console.log(`typeof textField: ${typeof textField}`);
        console.log(`textField: ${textField}`);
        console.log(`data: ${data}`);
        console.log(`data stringified: ${JSON.stringify(data)}`);
        //console.log(`Stringified data: ${JSON.stringify(data)}`);

        //console.log("DATA: ", data[0][0][0]);
        // const response = await fetch(url, {
        //     method: "post",
        //     headers: {"Content-Type": "application/json" },
        //     body: JSON.stringify(data[0])
        // });
        console.log(JSON.stringify(data));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        fetch(url, {
            mode: "no-cors",    // look into this
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
            //redirect: 'follow'
            //dataType: "json"
        })
            .then(res => res) // the .json() method parses the JSON response into a JS object literal
            .then(data => console.log(data))
            .catch(err => {
                console.error(err);
            });


    }

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
                    <Editor
                        //editorState={article}
                        //onEditorStateChange={onEditorStateChange}
                        onContentStateChange={setContentState}
                        >
                    </Editor>
                    
                    {/*editorState={editorState} onChange={setEditorState}*/}
                    
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
            height: '40vh',
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