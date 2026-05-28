import { StaticScreenProps } from "@react-navigation/native";
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

export interface PlanningListHeaderProps {
    onOpenWeekSelector: () => void;
}

export interface PlanningDetailsHeaderprops {
    name: string;
    handlePlanningGenerate: () => void;
}

export interface PlanningProps {
    name: string;
    onPress: () => void;
}

export interface Planning {
    id: number;
    weekNumber: number;
    year: number;
    name: string;
}

export type PlanningDetailsScreenProps = StaticScreenProps<{
    planningId: number;
    planningName: string;
}>;

export type AddPlanningScreenProps = StaticScreenProps<{
    weekNumber: number;
    year: number;
}>;

export interface ChoicesPlanningAPI {
    message: {
        role: "assistant" | "user" | "system";
        content: string;
    };
    logprobs: null;
    finish_reason: "stop" | "length" | "tool_calls" | "content_filter";
}

export interface ResponsePlanningAPI {
    choices: ChoicesPlanningAPI[];
}

export type MealGenerated = Partial<Record<MealType, string>>;

export interface DayGenerated {
    day: DayOfWeek;
    breakfast: MealGenerated;
    lunch: MealGenerated;
    dinner: MealGenerated;
}
export interface PlanningGenerated {
    week: DayGenerated[];
}

export type DietType = "loss_weight" | "gain_weight" | "muscle_gain" | "vegetarian" | "vegan" | "balanced";

export type TimeOfDay = "breakfast" | "lunch" | "dinner";
export type MealType = "starter" | "main" | "dessert";
export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export type PlanningMealType = Partial<Record<MealType, string>>;
export type PlanningTimeOfDay = Record<TimeOfDay, PlanningMealType>;
export type PlanningWeek = Record<DayOfWeek, PlanningTimeOfDay>;

export interface DaysWeekProps {
    daysWeek: PlanningWeek;
    days: DayOfWeek[];
}

export interface MealContainerProps {
    timeOfDay: TimeOfDay;
    dayWeek: PlanningTimeOfDay;
}

export type SavePlanningResponse =
    | {
          success: true;
          planningId: number;
      }
    | {
          success: false;
          error: string;
      };
