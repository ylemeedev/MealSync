import { api } from "../../../shared/api/axios";
import { HydraResponse } from "../../../shared/types/types";
import { Recipe } from "../types/recipe.types";

export const fetchRecipes = async (pageNumber: number): Promise<HydraResponse<Recipe>> => {
    const { data } = await api.get(`https://strength-impish-giveaway.ngrok-free.dev/api/recipes?page=${pageNumber}`);

    return data;
};
