import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../../assets";
import TextApp from "../../../shared/components/TextApp";
import { Typography } from "../../../assets/fonts";
import { HeaderContainer } from "../../../shared/components/HeaderContainer";
import { PlanningListHeaderProps } from "../types/mealPlanner.types";

export const PlanningListHeader = ({ onOpenWeekSelector }: PlanningListHeaderProps) => {
    return (
        <HeaderContainer>
            <View style={styles.header}>
                <TextApp style={styles.text}>Mes listes de courses</TextApp>
                <TouchableOpacity style={styles.btnEditCalendar} onPress={onOpenWeekSelector}>
                    <Icon name="edit-calendar" size={30} color={Colors.mainColor} />
                </TouchableOpacity>
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
    btnEditCalendar: {
        backgroundColor: Colors.secondaryColor,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        width: 40,
        height: 40,
    },
});
