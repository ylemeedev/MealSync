import { api } from "../../../shared/api/axios";
import { HydraResponse, PayloadUpdateShoppingListItems, ShoppingListItemWithIngredient } from "../types/shoppingList.types";
import { ShoppingListWithProgress } from "../types/shoppingList.types";

/**
 * Récupère tous les list de courses
 */
export const fetchShoppingsList = async (): Promise<ShoppingListWithProgress[]> => {
    const { data } = await api.get("/shopping-list-with-progress");
    return data;
};

/**
 * Récupère tous les ingrédients d'une liste de course
 */
export const fetchShoppingListItem = async (shoppingListId: number): Promise<HydraResponse<ShoppingListItemWithIngredient>> => {
    const { data } = await api.get(`/my-shopping-list-item`, {
        params: {
            shoppingList: shoppingListId,
        },
    });
    return data;
};

/**
 * Mise à jour de la colonne isChecked (ingrédients dans la liste de course)
 */
export const updateShoppingListItem = async (payload: PayloadUpdateShoppingListItems) => {
    const { data } = await api.patch(
        `/shopping_list_items/${payload.shoppingListItemId}`,
        { isChecked: payload.isChecked },
        {
            headers: {
                "Content-Type": "application/merge-patch+json",
            },
        },
    );
    return data;
};
