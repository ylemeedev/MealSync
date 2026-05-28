import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { ButtonCustomProps, ButtonTextProps } from "../types/types";
import { Colors } from "../../assets";
import TextApp from "./TextApp";

const ButtonCustom = ({ title, type, styleButton, styleText, titleColor = "dark", onPress, loader = false, ...props }: ButtonCustomProps) => {
    const ButtonText = ({ color }: ButtonTextProps) => (
        <TextApp
            style={{
                color: color === "dark" ? Colors.text : Colors.white,
                fontSize: type ? 18 : 16,
                ...styleText,
            }}
        >
            {title}
        </TextApp>
    );

    if (type === "color") {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={{
                    ...styles.touchableOpacity,
                    ...styleButton,
                    backgroundColor: Colors.mainColor,
                    opacity: props.disabled ? 0.5 : 1,
                }}
                {...props}
            >
                {loader ? <ActivityIndicator size={28} color={Colors.white} /> : <ButtonText color="light" />}
            </TouchableOpacity>
        );
    } else if (type === "light") {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={{
                    ...styles.touchableOpacity,
                    ...styleButton,
                    backgroundColor: Colors.secondaryColor,
                    opacity: props.disabled ? 0.5 : 1,
                }}
                {...props}
            >
                {loader ? <ActivityIndicator size={28} color={Colors.text} /> : <ButtonText color="dark" />}
            </TouchableOpacity>
        );
    } else if (type === "linear") {
        return (
            <TouchableOpacity onPress={onPress} style={{ ...styles.touchableOpacity, ...styleButton }}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[Colors.linearStart, Colors.linearEnd]}
                    style={{
                        ...styles.linearGradient,
                        opacity: props.disabled ? 0.5 : 1,
                    }}
                    {...props}
                >
                    {loader ? <ActivityIndicator size={28} color={Colors.white} /> : <ButtonText color="light" />}
                    <ButtonText color="light" />
                </LinearGradient>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity onPress={onPress} style={styleButton}>
                <ButtonText color={titleColor} />
            </TouchableOpacity>
        );
    }
};

export default ButtonCustom;

const styles = StyleSheet.create({
    touchableOpacity: {
        borderRadius: 10,
        height: 50,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    linearGradient: {
        borderRadius: 15,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});
