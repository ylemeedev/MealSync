import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Typography } from "../../assets/fonts";
import { TextAppProps } from "../types/types";
import { Colors } from "../../assets";

const TextApp = ({ children, style }: TextAppProps) => {
    return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

export default TextApp;

const styles = StyleSheet.create({
    text: {
        fontFamily: Typography.regular,
        color: Colors.text,
        fontSize: 14,
    },
});
