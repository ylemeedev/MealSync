import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import TextApp from "../../../shared/components/TextApp";
import { FiltersProps } from "../types/shoppingList.types";
import { Colors } from "../../../assets";
import Icon from "react-native-vector-icons/MaterialIcons";

export const Filters = ({ handlePress }: FiltersProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handlePress}
                style={styles.btn}
                activeOpacity={0.8}
            >
                <Icon name="filter-list-alt" size={20} color={Colors.white} />
                <TextApp style={styles.textBtn}>Filtrer</TextApp>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        flex: 1,
        height: 40,
    },
    btn: {
        backgroundColor: Colors.mainColor,
        borderRadius: 5,
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    textBtn: {
        color: Colors.white,
        marginLeft: 5,
    },
});
