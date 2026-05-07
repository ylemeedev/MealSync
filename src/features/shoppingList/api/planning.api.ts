import { api } from "../../../shared/api/axios";
import { HydraResponse, PlanningList } from "../types/shoppingList.types";

export const fetchPlannings = async (): Promise<HydraResponse<PlanningList>> => {
    const { data } = await api.get("/plannings?exists[planningRecipes]=true");
    return data;
};