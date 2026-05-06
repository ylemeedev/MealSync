import { FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import { ShoppingListsProps } from "../types/shoppingList.types";
import { ShoppingCard } from "./ShoppingCard";

export const ShoppingList = ({ shoppingLists }: ShoppingListsProps) => {

    return (
        <FlatList
            data={shoppingLists}
            renderItem={({ item }) => <ShoppingCard shoppingList={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatList}
        />
    );
};

const styles = StyleSheet.create({
    flatList: {
        paddingVertical: 15,
    }
})
