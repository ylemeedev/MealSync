import { StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "../../../assets";
import TextApp from "../../../shared/components/TextApp";
import { Typography } from "../../../assets/fonts";
import { HeaderContainer } from "../../../shared/components/HeaderContainer";

export const HeaderFavorite = () => {
    return (
        <HeaderContainer>
            <View style={styles.header}>
                <TextApp style={styles.text}>Favoris</TextApp>
            </View>
        </HeaderContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        color: Colors.white,
        textAlign: "center",
        fontFamily: Typography.medium,
        fontSize: 18,
    },
    btnAddList: {
        backgroundColor: Colors.secondaryColor,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        width: 40,
        height: 40,
    },
});
