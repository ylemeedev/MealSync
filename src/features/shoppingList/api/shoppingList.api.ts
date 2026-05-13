import { api } from "../../../shared/api/axios";
import {
    PayloadUpdateShoppingList,
    ShoppingListDetail,
} from "../types/shoppingList.types";

/**
 * Récupère tous les ingrédients d'une liste de course
 */
export const fetchShoppingList = async (
    shoppingListId: number,
): Promise<ShoppingListDetail> => {
    const { data } = await api.get(`shopping_lists/${shoppingListId}`);
    return data;
};

/**
 * Mise à jour de la colonne isChecked (ingrédients dans la liste de course)
 */
export const updateShoppingList = async (
    payload: PayloadUpdateShoppingList,
) => {
    const { data } = await api.patch(
        `shopping_list_items/${payload.shoppingListItemId}`,
        { isChecked: payload.isChecked },
        {
            headers: {
                "Content-Type": "application/merge-patch+json",
            },
        },
    );
    return data;
};
