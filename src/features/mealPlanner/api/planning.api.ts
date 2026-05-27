import { api } from "../../../shared/api/axios";
import { HydraResponse } from "../../../shared/types/types";
import { Planning } from "../../mealPlanner/types/mealPlanner.types";

export const fetchPlannings = async (): Promise<HydraResponse<Planning>> => {
    const { data } = await api.get("/my-plannings?exists[planningRecipes]=true");
    return data;
};