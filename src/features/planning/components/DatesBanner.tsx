import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, GlobalStyles } from "../../../assets";
import { calendarFr } from "../../../shared/helpers/date.helper";
import TextApp from "../../../shared/components/TextApp";
import { DatesBannerProps } from "../types/planning.types";

export const DatesBanner = ({ selectedWeek, onPrevWeek, onNextWeek }: DatesBannerProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPrevWeek}>
                <Icon name="navigate-before" size={20} color={Colors.text} />
            </TouchableOpacity>

            <TextApp style={styles.weekText}>
                {selectedWeek.startOfWeek.format("D")} {calendarFr.monthNamesShort[+selectedWeek.startOfWeek.format("M") - 1].toLowerCase()}{" "}
                {selectedWeek.startOfWeek.format("YYYY")} - {selectedWeek.endOfWeek.format("D")}{" "}
                {calendarFr.monthNamesShort[+selectedWeek.endOfWeek.format("M") - 1].toLowerCase()} {selectedWeek.endOfWeek.format("YYYY")}
            </TextApp>

            <TouchableOpacity onPress={onNextWeek}>
                <Icon name="navigate-next" size={20} color={Colors.text} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.secondaryColor,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: 15,
    },
    week: {
        padding: 10,
        backgroundColor: Colors.secondaryColor,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 15,
    },
    weekText: {
        textAlign: "center",
        fontSize: 16,
    },
});
