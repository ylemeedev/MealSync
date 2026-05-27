import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../../assets";
import TextApp from "../../../shared/components/TextApp";
import { Typography } from "../../../assets/fonts";
import { HeaderContainer } from "../../../shared/components/HeaderContainer";
import { PlanningDetailsHeaderprops } from "../types/mealPlanner.types";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";

export const PlanningDetailsHeader = ({ name, handlePlanningGenerate }: PlanningDetailsHeaderprops) => {
    const navigation = useAppNavigation();

    return (
        <HeaderContainer>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnGoBack} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={36} color={Colors.mainColor} />
                </TouchableOpacity>
                <TextApp style={styles.text}>{name}</TextApp>
                <TouchableOpacity style={styles.btnEditCalendar} onPress={handlePlanningGenerate}>
                    <Icon name="update" size={36} color={Colors.mainColor} />
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
    btnGoBack: {
        backgroundColor: Colors.secondaryColor,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        width: 40,
        height: 40,
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
