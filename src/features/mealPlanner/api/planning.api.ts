import { api } from "../../../shared/api/axios";
import { Planning } from "../../mealPlanner/types/mealPlanner.types";
import { HydraResponse } from "../../shoppingList/types/shoppingList.types";

export const fetchPlannings = async (): Promise<HydraResponse<Planning>> => {
    const { data } = await api.get("/my-plannings?exists[planningRecipes]=true");
    return data;
};