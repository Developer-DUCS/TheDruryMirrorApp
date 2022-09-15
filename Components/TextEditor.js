// Components
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from "react";

// Styles
import * as Icon from "react-native-feather";
import { Entypo } from '@expo/vector-icons';
import { globalStyles } from '../Styles/Global';

export function TextEditor()
{
    const [text, onChangeText] = React.useState("Write Here");
    const [number, onChangeNumber] = React.useState(null);

    return(
        <View>
                <View style={[styles.optionsBar, globalStyles.primaryContainer]}>
                    <View>
                        <Text style = {[globalStyles.paragraph, styles.optionsBarText]}>Fonts</Text>
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
                        <Icon.AlignRight style = {styles.optionsBarIcon}></Icon.AlignRight>
                    </View>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    optionsBar: {
        height: '40px',
        margin: 12,
        marginBottom: 6,
        padding: 12,
        borderRadius: 5,
        alignItems: 'flex-start',
        direction: 'column',
        flexDirection: 'row',
    },
    optionsBarText: {
        color: 'white',
        borderWidth: 1,
        padding: 3,
        borderColor: 'white',
        fontStyle: 'bold',
    },
    optionsBarIcon: {
        color: 'white',
        padding: 3,
        marginBottom: 3,
        borderColor: 'white',
        fontStyle: 'bold',
    },
    input: {
      height: '80%',
      margin: 12,
      marginTop: 0,
      borderWidth: 1,
      padding: 10,
    },
  });