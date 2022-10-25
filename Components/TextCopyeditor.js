// TextCopyeditor.js
// Created: 10/08/2022
// Purpose:
// For Copyeditors to highlight and comment on articles Writers drafted
//
// Modification Log:



// Components
import { StyleSheet, Text, View, Platform} from 'react-native';
import { Component, React, useState, useEffect, useCallback  } from 'react';
import { Input, Button } from 'react-native-elements';
import { Editor } from 'react-draft-wysiwyg';
import { CommentContainer } from './CommentContainer';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import  DtPicker  from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';

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
export function TextCopyEditor()
{

    // stackOfComments is a stack of comment components, added/pushed each time addComment is called
    let stackOfComments = []

    // PopulateComments
    // - Fetches comments from database, ids of comments attatched to this article
    // - Return a stack of cards w/ props changed to comment data
    function populateComments(){

    }

    // CopyEditors current comments
    const [getCommentInput, setCommentInput] = useState({});

    // Current EditorState properties
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const onEditorStateChange = (editorState) => {
      setEditorState(editorState)
    }

    // Reference data for CopyEditor and comment container
    const [getReferenceData, setReferenceData] = useState({});
    function findReferenceData(){
        var selectionState = editorState.getSelection();
        var anchorKey = selectionState.getAnchorKey();
        var currentContent = editorState.getCurrentContent();
        var currentContentBlock = currentContent.getBlockForKey(anchorKey);
        var start = selectionState.getStartOffset();
        var end = selectionState.getEndOffset();
        var selectedText = currentContentBlock.getText().slice(start, end);
        setReferenceData(selectedText);
        console.log(selectedText);
    }
    
    useEffect(() => {
        findReferenceData();
    }, [editorState]);


    // Sprint 3
    // onAddComment Function
    // - Called whenever "Add" comment button is clicked
    function onAddComment(){
        // getCommentInput is from the input field above the add button
        // getReferenceData is the selection from the mouse cursor

    }

    // Sprint 2
    // SaveDraft Function
    // - Called whenever the "Save Draft" button is clicked, uploads inputs in TextEditor to the MySQL database
    // TODO: Add props for this function from current article inputs
    // TODO: Connect to MySQL database
    function SaveDraft()
    {
        // Upload json to MysQL database
        console.log("pressed saved draft");
        console.log(JSON.stringify(editorState, 2));
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
                {/* Two Rows - CopyEditor, Comments */}
                <View style={styles.copyEditorView}>
                    {/* Rich Text Editor */}
                    <View style = {styles.textEditor}>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={onEditorStateChange}
                        />
                    </View>

                    {/* Comment Section */}
                    <View style = {styles.commentsContainer}>
                        { populateComments() }
                        <View>
                            <Input
                            placeholder = "Comment"
                            onChangeText = { value => setCommentInput(value)}
                            style = {styles.headlineInput}
                            />
                            <Button title="Add" 
                            type="outline" 
                            style={styles.addComment}  
                            onPress={() => onAddComment()}/>
                        </View>
                    </View>
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
        commentsContainer:{
            width: '25vw',
            height: '70vh',
            borderRadius: 5,
            marginLeft: 5,
        },
        copyEditorView:{
            flex: 2,
            flexDirection: 'row',
        },
        articleInputs:{
            padding: 3,
            marginLeft: 30,
            width: '60vw',
            display: 'inline-block',
        },
        statusBar: {
            alignItems: 'flex-start',
            margin: 5,
            marginBottom: 5,
            marginLeft: 15,
        },
        statusItems: {
            borderRadius: 5,
            borderWidth: 1,
        },
        headlineView: {
            marginBottom: 10,
            marginTop: 10,
            marginLeft: 10,
        },
        headlineInput: {
            outlineStyle: 'none',
            marginLeft: 10,
        },
        textEditor: {
            borderWidth: 1,
            borderRadius: 3,
            padding: 6,
            marginLeft: 15,
            height: '80vh',
            width: '60vw'
        },
        citationsView: {
            borderWidth: 1,
            borderRadius: 5,
            margin: 5,
            marginTop: 10,
            marginLeft: 15,
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
        },
        addComment: {
            marginBottom: 15,
        }

  });
