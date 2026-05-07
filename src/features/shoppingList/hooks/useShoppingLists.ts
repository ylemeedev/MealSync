import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchShoppingList, updateShoppingList } from "../api/shoppingList.api";
import { PayloadUpdateShoppingList } from "../types/shoppingList.types";

/**
 * Listes de courses
 */
export const useShoppingLists = (shoppingListId: number, options = {}) => {
    return useQuery({
        queryKey: ["shoppingLists", shoppingListId],
        queryFn: () => fetchShoppingList(shoppingListId),
        ...options,
    });
};

/**
 * Mise à jour ingredients d'une liste de courses
 */
export const useUpdateShoppingLists = (shoppingListId: number) => {
    const queryClient = useQueryClient(); // accés au cache React Query

    return useMutation({
        mutationFn: ({ shoppingListItemId, isChecked }: PayloadUpdateShoppingList) => updateShoppingList({ shoppingListItemId, isChecked }),
        // Mise à jour immédiate de l'UI
        onMutate: async ({ shoppingListItemId, isChecked }) => {
            // Stop les refetchs en cours
            await queryClient.cancelQueries({ queryKey: ["shoppingLists", shoppingListId] });

            // Sauvegarde de l'ancien cache
            const previousData = queryClient.getQueryData(["shoppingLists", shoppingListId]);

            // Mise à jour du cache React Query
            queryClient.setQueryData(["shoppingLists", shoppingListId], (old: any) => {
                if (!old) return;

                return {
                    ...old,
                    shoppingListItems: old.shoppingListItems.map((item: any) => (item.id === shoppingListItemId ? { ...item, isChecked } : item)),
                };
            });

            return { previousData };
        },
        onError: (_err, _variables, context) => {
            queryClient.setQueryData(["shoppingLists", shoppingListId], context?.previousData);
        },
        // Resynchroniser data avec le serveur
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["shoppingLists", shoppingListId],
            });
        },
    });
};
