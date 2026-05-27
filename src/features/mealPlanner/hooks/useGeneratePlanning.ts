import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DietType, PlanningWeek } from "../types/mealPlanner.types";
import { planningGenerator, savePlanning } from "../api/planningGenerator.api";

export const usePlanningGenerator = () => {
    return useMutation({
        mutationFn: (typeMenu: DietType) => {
            return planningGenerator(typeMenu);
        },
        onError: (error) => {
            console.log("Planning error:", error);
        },
        retry: 3,
    });
};

export const useSavePlanning = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            planning,
            planningId,
            name,
            weekNumber,
            year,
        }: {
            planning: PlanningWeek;
            planningId?: number;
            name?: string;
            weekNumber?: number;
            year?: number;
        }) => savePlanning(planning, planningId, name, weekNumber, year),
        onSuccess: () => {
            // Mise à jour des plannings
            queryClient.invalidateQueries({
                queryKey: ["plannings"],
            });
        },
        onError: (error: any) => {
            return {
                success: false,
                error: error?.response?.data?.error ?? "Unknown error",
            };
        },
    });
};
