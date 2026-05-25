import { api } from "../../../shared/api/axios";
import { DietType, PlanningWeek } from "../types/mealPlanner.types";

export const planningGenerator = async (typeMenu: DietType): Promise<PlanningWeek> => {

    console.log("🚀🚀🚀🚀🚀🚀🚀<<<< 🚀🚀🚀🚀🚀🚀🚀")

    const menuTypes: Record<DietType, string> = {
        loss_weight: "Cuisine légère, faible en calories, riche en fibres et protéines maigres.",
        gain_weight: "Cuisine riche en calories, portions généreuses, avec glucides et lipides augmentés.",
        muscle_gain: "Cuisine riche en protéines, chaque repas doit inclure une source de protéine.",
        vegetarian: "Cuisine végétarienne sans viande ni poisson, basée sur légumineuses, œufs et produits laitiers.",
        vegan: "Cuisine 100% végétale, sans produits d'origine animale.",
        balanced: "Cuisine équilibrée, variée et familiale avec un bon équilibre nutritionnel.",
    };

    const { data } = await api.post("/meal-plan", {
        params: {
            diet: menuTypes[typeMenu] ?? "Cuisine familiale européenne.",
        },
        headers: {
            "Content-Type": "application/json",
        },
    });

    console.log("planningGenerator🚀 ~ planningGenerator ~ data:", data)
    return data;
};

export const savePlanning = async (planningId: number, planning: PlanningWeek) => {
    const { data } = await api.post("/planning-recipes/bulk", {
        params: {
            planning,
            planningId,
        },
        headers: {
            "Content-Type": "application/json",
        },
    });

    return data;
};

export const saveIngredients = async (planningId: number, planning: PlanningWeek) => {
    const { data } = await api.post("/planning-recipes/bulk", {
        params: {
            planning,
            planningId,
        },
        headers: {
            "Content-Type": "application/json",
        },
    });

    return data;
};
