import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchShoppingListItem, fetchShoppingsList, updateShoppingListItem } from "../api/shoppingList.api";
import { HydraResponse, PayloadUpdateShoppingListItems, ShoppingListItemWithIngredient, ShoppingListWithProgress } from "../types/shoppingList.types";

/**
 * Listes de course
 */
export const useShoppingsList = (options = {}) => {
    return useQuery({
        queryKey: ["shoppingsList"],
        queryFn: () => fetchShoppingsList(),
        ...options,
    });
};

/**
 * Items d'une liste de courses
 */
export const useShoppingListItem = (shoppingListId: number, options = {}) => {
    return useQuery({
        queryKey: ["shoppingListItem", shoppingListId],
        queryFn: () => fetchShoppingListItem(shoppingListId),
        select: (res) => res.member,
        ...options,
    });
};

/**
 * Mise à jour ingredients d'une liste de courses
 */
export const useUpdateShoppingList = (shoppingListId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ shoppingListItemId, isChecked }: PayloadUpdateShoppingListItems) => updateShoppingListItem({ shoppingListItemId, isChecked }),

        // Optimistic update (uniquement isChecked)
        onMutate: async ({ shoppingListItemId, isChecked }) => {
            await queryClient.cancelQueries({
                queryKey: ["shoppingListItem", shoppingListId],
            });

            const previousShoppingListItem = queryClient.getQueryData(["shoppingListItem", shoppingListId]);
            const previousShoppingsList = queryClient.getQueryData(["shoppingsList"]);

            // update items list
            queryClient.setQueryData(["shoppingListItem", shoppingListId], (old: HydraResponse<ShoppingListItemWithIngredient>) => {
                if (!old) return old;

                return {
                    ...old,
                    member: old.member.map((item: ShoppingListItemWithIngredient) => (item.id === shoppingListItemId ? { ...item, isChecked } : item)),
                };
            });

            queryClient.setQueryData(["shoppingsList"], (old: ShoppingListWithProgress[]) => {
                if (!old) return old;

                return old.map((list: ShoppingListWithProgress) => {
                    if (list.id !== shoppingListId) return list;

                    const nextChecked = list.checkedItems + (isChecked ? 1 : -1);

                    return {
                        ...list,
                        checkedItems: nextChecked,
                        progress: Math.round((nextChecked / list.totalItems) * 100),
                    };
                });
            });

            return { previousShoppingListItem, previousShoppingsList };
        },

        // rollback si erreur
        onError: (_err, _vars, context) => {
            if (context?.previousShoppingListItem) {
                queryClient.setQueryData(["shoppingListItem", shoppingListId], context.previousShoppingListItem);
            }

            if (context?.previousShoppingsList) {
                queryClient.setQueryData(["shoppingsList"], context.previousShoppingsList);
            }
        },

        // resync serveur (source de vérité)
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["shoppingListItem", shoppingListId],
            });

            /*             queryClient.invalidateQueries({
                queryKey: ["shoppingsList"],
            }); */
        },
    });
};
