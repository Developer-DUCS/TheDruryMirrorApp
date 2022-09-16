// Components
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from "react";
import {Dropdown} from 'react-native-element-dropdown';

// Styles
import * as Icon from "react-native-feather";
import { Entypo } from '@expo/vector-icons';
import { globalStyles } from '../Styles/Global';

export function HeadlineField()
{
    
    const [text, onChangeText] = React.useState("");
    const [number, onChangeNumber] = React.useState(null);

    const [dropdown, setDropdown] = React.useState(null);
        const [selected, setSelected] = React.useState([]);

    const fontTypeData = [
        {label: 'Times New Roman', value: '1'},
        {label: 'Arial', value: '2'},
        {label: 'Garamond Regular', value: '3'},
    ];

    const fontSizeData = [
        {label: '6', value: '1'},
        {label: '8', value: '2'},
        {label: '12', value: '3'},
        {label: '16', value: '4'},
        {label: '18', value: '5'},
        {label: '24', value: '6'},
    ];

    const _renderItem = item => {
        return (
        <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
        </View>
        );
    };


    return(
        <View>
                <View style={[styles.optionsBar, globalStyles.primaryContainer]}>
                    <View>
                        <Dropdown
                            style={[styles.dropdown, styles.optionsBarText]}
                            containerStyle={styles.shadow}
                            data={fontTypeData}
                            search
                            searchPlaceholder="Search"
                            labelField="label"
                            valueField="value"
                            label="Fonts"
                            placeholder="Font"
                            value={dropdown}
                            onChange={item => {
                            setDropdown(item.value);
                                console.log('selected', item);
                            }}
                            renderItem={item => _renderItem(item)}
                            textError="Error"
                        />
                    </View>
                    <View>
                        <Dropdown
                            style={[styles.dropdown, styles.optionsBarText]}
                            containerStyle={styles.shadow}
                            data={fontSizeData}
                            search
                            searchPlaceholder="Search"
                            labelField="label"
                            valueField="value"
                            label="Size"
                            placeholder="Size"
                            value={dropdown}
                            onChange={item => {
                            setDropdown(item.value);
                                console.log('selected', item);
                            }}
                            renderItem={item => _renderItem(item)}
                            textError="Error"
                        />
                    </View>
                    <View>
                        <Text style = {[globalStyles.paragraph, styles.optionsBarText]}>B</Text>
                    </View>
                    <View>
                        <Text style = {[globalStyles.paragraph, styles.optionsBarText]}>U</Text>
                    </View>
                    <View>
                        <Text style = {[globalStyles.paragraph, styles.optionsBarText]}>I</Text>
                    </View>
                    <View>
                        <Icon.AlignLeft style = {styles.optionsBarIcon}></Icon.AlignLeft>
                    </View>
                    <View>
                        <Icon.AlignCenter style = {styles.optionsBarIcon}></Icon.AlignCenter>
                    </View>
                    <View>
                        <Icon.AlignRight style = {styles.optionsBarIcon} multiline></Icon.AlignRight>
                    </View>
                </View>
                <TextInput
                    style={styles.headlineField}
                    onChangeText={onChangeText}
                    placeholder = "Write Your Header Here..."
                    value={text}
                    multiline
                />
                
        </View>
    )
}

export function TextEditor()
{
    
    const [text, onChangeText] = React.useState("");
    const [number, onChangeNumber] = React.useState(null);

    return(
        <View>
                
                <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeText}
                    placeholder = "Write Your Article Here..."
                    value={text}
                    multiline
                />
        </View>
    )
}


export function SourcesField()
{
    
    const [text, onChangeText] = React.useState("");
    const [number, onChangeNumber] = React.useState(null);

    return(
        <View>
                
                <TextInput
                    style={styles.sourcesField}
                    onChangeText={onChangeText}
                    placeholder = "Write Your Sources Here..."
                    value={text}
                    multiline
                />
        </View>
    )
}


const styles = StyleSheet.create({
    optionsBar: {
        height: '60px',
        margin: 12,
        marginBottom: 6,
        padding: 12,
        borderRadius: 5,
        alignItems: 'flex-start',
        direction: 'column',
        flexDirection: 'row',
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,

    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    optionsBarText: {
        color: 'white',
        borderWidth: 1,
        padding: 3,
        paddingLeft: 6,
        paddingRight: 6,
        borderColor: 'white',
        fontStyle: 'bold',
    },
    optionsBarIcon: {
        color: 'white',
        marginBottom: 3,
        marginLeft: 6,
        borderColor: 'white',
        fontStyle: 'bold',
    },
    headlineField: {
      height: '5vh',
      textAlignVertical: 'top',
      padding: 3,
      paddingLeft: 5,
      margin: 12,
      marginTop: 0,
      borderWidth: 1,
    },
    textInput: {
      height: '80vh',
      //textAlignVertical: 'top',
      padding: 3,
      paddingLeft: 5,
      margin: 12,
      marginTop: 0,
      borderWidth: 1,
    },
    sourcesField: {
      height: '15vh',
      //textAlignVertical: 'top',
      padding: 3,
      paddingLeft: 5,
      margin: 12,
      marginTop: 0,
      borderWidth: 1,
    },
  });