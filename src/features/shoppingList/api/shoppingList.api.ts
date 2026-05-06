import { api } from "../../../shared/api/axios";
import { HydraResponse, Planning } from "../types/shoppingList.types";

export const fetchPlannings = async (userId: number): Promise<HydraResponse<Planning>> => {
    const { data } = await api.get("/plannings?exists[planningRecipes]=true");

    return data;
};
