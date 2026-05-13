import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "../../assets";
import { InputProps } from "../types/types";

const Input = ({ style, ...props }: InputProps) => {
    return (
        <TextInput
            style={{
                ...styles.textInput,
                ...style,
                backgroundColor: Colors.white,
            }}
            {...props}
            placeholderTextColor={Colors.text}
        />
    );
};

export default Input;

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 10,
        color: Colors.text,
    },
});
