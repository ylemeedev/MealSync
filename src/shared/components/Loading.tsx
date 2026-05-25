import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";
import { Colors } from "../../assets";
import { Typography } from "../../assets/fonts";

export const Loading = () => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={100} color={Colors.mainColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
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
