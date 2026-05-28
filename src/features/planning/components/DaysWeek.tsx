import { StyleSheet, View } from "react-native";
import { DaysWeekProps } from "../types/planning.types";
import { Colors } from "../../../assets";
import { Typography } from "../../../assets/fonts";
import TextApp from "../../../shared/components/TextApp";
import { trad } from "../../../constants/layout";
import { MealContainer } from "./MealContainer";

export const DaysWeek = ({ daysWeek, days }: DaysWeekProps) => {

    return days.map((day, key) => (
        <View key={key} style={styles.dayContainer}>
            <View style={styles.dayHeader}>
                <TextApp style={styles.day}>{trad[day]}</TextApp>
            </View>

            <MealContainer timeOfDay={"breakfast"} dayWeek={daysWeek[day]}/>
            <MealContainer timeOfDay={"dinner"} dayWeek={daysWeek[day]}/>
            <MealContainer timeOfDay={"lunch"} dayWeek={daysWeek[day]}/>
        </View>
    ));
};

const styles = StyleSheet.create({
    dayContainer: {
        backgroundColor: Colors.white,
        borderRadius: 7,
        overflow: "hidden",
    },
    dayHeader: {
        backgroundColor: Colors.secondaryColor,
        padding: 10,
    },
    mealContainer: {
        padding: 10,
    },
    meal: {
        textTransform: "uppercase",
        fontFamily: Typography.medium,
        fontSize: 16,
    },
    day: {
        textTransform: "uppercase",
        fontFamily: Typography.bold,
        color: Colors.mainColor,
        fontSize: 16,
        textAlign: "center",
    },
});
