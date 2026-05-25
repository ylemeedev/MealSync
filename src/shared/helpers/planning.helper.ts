import { PlanningWeek } from "../../features/mealPlanner/types/mealPlanner.types";
import { days } from "../constants/constants";

const emptyMeal = () => ({
    starter: "",
    main: "",
    dessert: "",
});

const emptyDay = () => ({
    breakfast: emptyMeal(),
    lunch: emptyMeal(),
    dinner: emptyMeal(),
});

/**
 * Formate les données
 */
export const formatPlanningWeek = (planning: PlanningWeek) => {
    if (!planning) return;

    return days.reduce((acc, day) => {
        acc[day] = planning[day] ?? emptyDay();
        return acc;
    }, {} as PlanningWeek);
};
