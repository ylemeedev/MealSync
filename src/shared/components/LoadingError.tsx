import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";
import { Colors } from "../../assets";
import { Typography } from "../../assets/fonts";
import { fr } from "../lang/fr";
import TextApp from "./TextApp";

export const LoadingError = () => {
    return (
        <View style={styles.errorContainer}>
            <TextApp style={styles.errorText}>{fr.loadingError}</TextApp>
        </View>
    );
};

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: Colors.danger,
        fontSize: 16,
        fontFamily: Typography.semiBold,
    },
});
