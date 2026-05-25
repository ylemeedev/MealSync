import { StyleSheet, TouchableOpacity, View } from "react-native";
import TextApp from "../../../shared/components/TextApp";
import { Colors, GlobalStyles } from "../../../assets";
import { PlanningProps } from "../types/mealPlanner.types";
import { Typography } from "../../../assets/fonts";

export const Planning = ({ name, onPress }: PlanningProps) => {

    return (
        <View style={GlobalStyles.ph}>
            <TouchableOpacity onPress={onPress} style={styles.planningContainer} activeOpacity={0.9}>
                <View style={styles.content}>
                    <TextApp style={styles.textContent}>{name}</TextApp>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    planningContainer: {
        backgroundColor: Colors.white,
        borderRadius: 7,
        overflow: "hidden",
        marginVertical: 10,
    },
    content: {
        backgroundColor: Colors.secondaryColor,
        paddingVertical: 20,
        paddingHorizontal: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    textContent: {
        fontSize: 16,
        fontFamily: Typography.semiBold
    },
});
