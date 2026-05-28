import { StyleSheet, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, GlobalStyles } from "../../../assets";
import { DateData, Direction } from "react-native-calendars/src/types";
import dayjs from "dayjs";
import { useState } from "react";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import { CalendarMealPlannerProps, SelectedWeekData } from "../types/planning.types";
import { calendarFr, findCurrentWeek } from "../../../shared/helpers/date.helper";
import { Typography } from "../../../assets/fonts";

LocaleConfig.locales["fr"] = calendarFr;
LocaleConfig.defaultLocale = "fr";

export const CalendarMealPlanner = ({ onValidate, week }: CalendarMealPlannerProps) => {
    const [selectedWeek, setSelectedWeek] = useState<SelectedWeekData>(week);

    const onDayPress = (day: DateData) => {
        const selected = dayjs(day.dateString);
        const currentWeek = findCurrentWeek(selected);
        setSelectedWeek(currentWeek);
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <Calendar
                    initialDate={selectedWeek.startOfWeek.format()}
                    style={styles.calendar}
                    firstDay={1}
                    renderArrow={(direction: Direction) => (
                        <Icon name={direction === "left" ? "navigate-before" : "navigate-next"} size={20} color={Colors.text} />
                    )}
                    onDayPress={(day: DateData) => onDayPress(day)}
                    markingType="period"
                    markedDates={selectedWeek.range}
                    theme={{
                        textDayFontFamily: Typography.regular,
                        textMonthFontFamily: Typography.semiBold,
                        textDayHeaderFontFamily: Typography.semiBold,
                        textMonthFontSize: 18,
                        textDayHeaderFontSize: 14,
                        textDayFontSize: 16,
                    }}
                />

                <View style={styles.btns}>
                    <ButtonCustom
                        styleButton={{ flex: 1 }}
                        styleText={styles.btnCancel}
                        title="Fermer"
                        onPress={() => onValidate()}
                        disabled={Object.keys(selectedWeek.range).length > 0 ? false : true}
                    />
                    <ButtonCustom
                        styleButton={{ flex: 1 }}
                        title="Valider"
                        onPress={() => onValidate(selectedWeek)}
                        type="color"
                        disabled={Object.keys(selectedWeek.range).length > 0 ? false : true}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        ...GlobalStyles.ph,
    },
    containerForm: {
        width: "100%",
        backgroundColor: Colors.white,
        paddingVertical: 20,
        borderRadius: 10,
        ...GlobalStyles.ph,
    },
    calendar: {
        width: "100%",
        marginBottom: 30,
    },
    btnCancel: {
        marginTop: 15,
        textAlign: "center",
    },
    btns: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
