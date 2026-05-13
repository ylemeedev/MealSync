import dayjs from "dayjs";

export interface CalendarMealPlannerProps {
    onValidate: (selectedWeek?: SelectedWeekData) => void;
    week: SelectedWeekData;
}

export interface MarkedDates {
    [date: string]: {
        selected: boolean;
        disableTouchEvent: boolean;
        color: string;
        textColor: string;
        startingDay: boolean;
        endingDay: boolean;
    };
}

export interface SelectedWeekData {
    startOfWeek: dayjs.Dayjs;
    endOfWeek: dayjs.Dayjs;
    range: MarkedDates;
    weekOfYear: number;
    year: number;
}

export interface DatesBannerProps {
    selectedWeek: SelectedWeekData;
    onPrevWeek: () => void;
    onNextWeek: () => void;
}

export interface HeaderMealPlannerProps {
    onOpenWeekSelector: () => void;
}
