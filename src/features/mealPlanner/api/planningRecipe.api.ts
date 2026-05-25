import { api } from "../../../shared/api/axios";
import { PlanningWeek } from "../types/mealPlanner.types";

export const fetchPlanningRecipe = async (planningId: number): Promise<PlanningWeek> => {
    const { data } = await api.get(`/planning-week/${planningId}`);
    return data;
};


/* export addPlanningRecipe = async (planningWeek: PlanningWeek) => {
    const { data } = await api.post('')
} */