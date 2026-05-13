import dayjs from "dayjs";
import { MarkedDates, SelectedWeekData } from "../../features/mealPlanner/types/mealPlanner.types";
import { Colors } from "../../assets";
import isoWeek from "dayjs/plugin/isoWeek";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isoWeek);
dayjs.extend(isSameOrBefore);

export const calendarFr = {
    monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    monthNamesShort: ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."],
    dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Aujourd'hui",
};

export const findCurrentWeek = (selected: dayjs.Dayjs): SelectedWeekData => {
    const startOfWeek = selected.startOf("isoWeek");
    const endOfWeek = selected.endOf("isoWeek");
    const weekOfYear = startOfWeek.isoWeek();
    const year = startOfWeek.year();

    let range: MarkedDates = {};
    let current = startOfWeek.clone();

    while (current.isSameOrBefore(endOfWeek, "day")) {
        range[current.format("YYYY-MM-DD")] = {
            selected: true,
            disableTouchEvent: true,
            startingDay: current.isSame(startOfWeek, "day"),
            endingDay: current.isSame(endOfWeek, "day"),
            color: current.isSame(startOfWeek, "day") || current.isSame(endOfWeek, "day") ? Colors.mainColor : Colors.secondaryColor,
            textColor: Colors.white,
        };

        current = current.add(1, "day");
    }
    return { startOfWeek, endOfWeek, range, weekOfYear, year };
};
