import { StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "../../../assets";
import TextApp from "../../../shared/components/TextApp";
import { Typography } from "../../../assets/fonts";
import { HeaderContainer } from "../../../shared/components/HeaderContainer";
import { HeaderCheckedShoppingListProps } from "../types/shoppingList.types";

export const HeaderCheckedShoppingList = ({ title }: HeaderCheckedShoppingListProps) => {
    return (
        <HeaderContainer>
            <View style={styles.header}>
                <TextApp style={styles.text}>{title}</TextApp>
            </View>
        </HeaderContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
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
        width: 30,
        height: 30,
    },
});
