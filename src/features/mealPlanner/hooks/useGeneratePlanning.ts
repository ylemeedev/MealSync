import { useMutation } from "@tanstack/react-query";
import { DietType, PlanningWeek } from "../types/mealPlanner.types";
import { planningGenerator, savePlanning } from "../api/planningGenerator.api";

export const usePlanningGenerator = () => {
    return useMutation({
        mutationFn: (typeMenu: DietType) => {
            console.log("ookokokokokoko")
            return planningGenerator(typeMenu);
        },
        onError: (error) => {
            console.log("Planning error:", error);
        },
        retry: 3,
    });
};

export const useSavePlanning = () => {
    return useMutation({
        mutationFn: ({ planningId, planning }: { planningId: number; planning: PlanningWeek }) => savePlanning(planningId, planning),
        onError: (error) => {
            console.log("Planning error:", error);
        },
    });
};
