import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../../assets";
import TextApp from "../../../shared/components/TextApp";
import { Typography } from "../../../assets/fonts";
import { HeaderContainer } from "../../../shared/components/HeaderContainer";

export const HeaderAddPlanning = () => {
    return (
        <HeaderContainer>
            <View style={styles.header}>
                <TextApp style={styles.text}>Ajout planning</TextApp>
{/*                 <TouchableOpacity style={styles.btnEditCalendar} onPress={() => {}}>
                    <Icon name="update" size={36} color={Colors.mainColor} />
                </TouchableOpacity> */}
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
