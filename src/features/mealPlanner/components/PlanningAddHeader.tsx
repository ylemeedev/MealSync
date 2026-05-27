import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../../assets";
import TextApp from "../../../shared/components/TextApp";
import { Typography } from "../../../assets/fonts";
import { HeaderContainer } from "../../../shared/components/HeaderContainer";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";
import { fr } from "../../../shared/lang/fr";

export const PlanningAddHeader = () => {
    const navigation = useAppNavigation();

    return (
        <HeaderContainer>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnGoBack} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={36} color={Colors.mainColor} />
                </TouchableOpacity>
                <TextApp style={styles.text}>{fr.planning.title.newPlanning}</TextApp>
            </View>
        </HeaderContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20
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
