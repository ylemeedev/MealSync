import { useQuery } from "@tanstack/react-query";
import { fetchRecipes } from "../api/recipe.api";

export const useRecipes = (pageNumber: number) => {
    return useQuery({
        queryKey: ["recipes"],
        queryFn: () => fetchRecipes(pageNumber),
        select: (res) => res.member,
    });
};
