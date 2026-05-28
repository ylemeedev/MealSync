import { StyleSheet, View } from "react-native";
import TextApp from "../../../shared/components/TextApp";
import { Typography } from "../../../assets/fonts";
import { MealContainerProps } from "../types/planning.types";
import { trad } from "../../../constants/layout";

export const MealContainer = ({ timeOfDay, dayWeek }: MealContainerProps) => {
    return (
        <View style={styles.mealContainer}>
            <TextApp style={styles.meal}>{trad[timeOfDay]}</TextApp>
            {dayWeek[timeOfDay].starter && <TextApp>{dayWeek[timeOfDay].starter}</TextApp>}
            {dayWeek[timeOfDay].main && <TextApp>{dayWeek[timeOfDay].main}</TextApp>}
            {dayWeek[timeOfDay].dessert && <TextApp>{dayWeek[timeOfDay].dessert}</TextApp>}
        </View>
    );
};

const styles = StyleSheet.create({
    mealContainer: {
        padding: 10,
    },
    meal: {
        textTransform: "uppercase",
        fontFamily: Typography.medium,
        fontSize: 16,
    },
});
