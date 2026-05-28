import { api } from "../../../shared/api/axios";
import { PlanningWeek } from "../types/planning.types";

export const fetchPlanningRecipe = async (planningId: number): Promise<PlanningWeek> => {
    const { data } = await api.get(`/planning-week/${planningId}`);
    return data;
};