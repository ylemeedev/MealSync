import { StyleSheet, ScrollView, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";
import { PlanningDetailsHeader } from "../components/PlanningDetailsHeader";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import { Colors, GlobalStyles } from "../../../assets";
import { usePlanningRecipe } from "../hooks/usePlanningRecipe";
import { PlanningDetailsScreenProps, DayOfWeek, PlanningWeek } from "../types/planning.types";
import { DaysWeek as DaysWeekView } from "../components/DaysWeek";
import { usePlanningGenerator, useSavePlanning } from "../hooks/useGeneratePlanning";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import { formatPlanningWeek } from "../../../shared/helpers/planning.helper";
import { days } from "../../../shared/constants/constants";
import { fr } from "../../../shared/lang/fr";
import { LoadingError } from "../../../shared/components/LoadingError";
import PlanningDetailsSkeleton from "../components/skeleton/PlanningDetailsSkeleton";

const testJson = {
    monday: {
        breakfast: {
            starter: "Salade de tomates et de basilic",
            main: "Pâtes au pesto",
        },
        lunch: { main: "Quiche de légumes" },
        dinner: {
            starter: "Soupe de potiron",
            main: "Ratatouille provençale",
            dessert: "Tarte aux fruits rouges",
        },
    },
    tuesday: {
        breakfast: {
            starter: "Smoothie de banane et de noix de coco",
            main: "Crêpes aux fruits",
        },
        lunch: {
            starter: "Salade de roquette et de noix",
            main: "Sandwich de tofu et de laitue",
        },
        dinner: {
            starter: "Carpaccio de betterave",
            main: "Lasagnes végétariennes",
            dessert: "Gâteau au chocolat végétal",
        },
    },
    wednesday: {
        breakfast: {
            starter: "Yaourt nature et miel",
            main: "Pain complet avec beurre de cacahuète",
        },
        lunch: { main: "Tacos de légumes" },
        dinner: {
            starter: "Soupe de carottes",
            main: "Courgettes farcies",
            dessert: "Crème brûlée végétale",
        },
    },
    thursday: {
        breakfast: {
            starter: "Jus de pomme et de carotte",
            main: "Omelette de tofu",
        },
        lunch: {
            starter: "Salade de chou et de noix",
            main: "Quiche de poivrons",
        },
        dinner: {
            starter: "Tomates cerises avec basilic",
            main: "Risotto aux champignons",
            dessert: "Tarte aux abricots",
        },
    },
    friday: {
        breakfast: {
            starter: "Smoothie de mangue et de banane",
            main: "Crêpes aux légumes",
        },
        lunch: { main: "Sushi de légumes" },
        dinner: {
            starter: "Soupe de lentilles",
            main: "Poulet de tofu à la crème de champignons",
            dessert: "Gâteau aux noix",
        },
    },
    saturday: {
        breakfast: {
            starter: "Yaourt nature et fraises",
            main: "Pain complet avec beurre de noix",
        },
        lunch: {
            starter: "Salade de chou et de carottes",
            main: "Tacos de tofu",
        },
        dinner: {
            starter: "Carpaccio de concombre",
            main: "Lasagnes aux légumes",
            dessert: "Crème glacée végétale",
        },
    },
    sunday: {
        breakfast: {
            starter: "Jus de citron et de gingembre",
            main: "Omelette de tofu et de légumes",
        },
        lunch: { main: "Quiche de légumes" },
        dinner: {
            starter: "Soupe de potiron",
            main: "Ratatouille provençale",
            dessert: "Tarte aux fruits rouges",
        },
    },
};

export const PlanningDetailsScreen = ({ route }: PlanningDetailsScreenProps) => {
    const navigation = useAppNavigation();
    const { planningId, planningName } = route.params;

    const { data: planningRecipes, isLoading, error } = usePlanningRecipe(planningId);

    const [daysWeek, setDaysWeek] = useState<PlanningWeek>();
    const [generatedPlanning, setGeneratedPlanning] = useState<boolean>(false);

    /**
     * Récupère les données de la BDD
     */
    useEffect(() => {
        if (!planningRecipes) return;
        setDaysWeek(formatPlanningWeek(planningRecipes));
    }, [planningRecipes]);

    /**
     * Requete open API (genère un nouveau planning pour la semaine)
     */
    const {
        mutate: mutatePlanningGenerated,
        data: planningGenerated,
        isPending: isPendingPlanningGenerated,
        isError: isErrorPlanningGenerated,
        error: errorPlanningGenerated,
    } = usePlanningGenerator();

    /* const handlePlanningGenerate = () => mutatePlanningGenerated("vegan"); */

    const handlePlanningGenerate = () => {
        if (!testJson) return;
        setDaysWeek(formatPlanningWeek(testJson));
        setGeneratedPlanning(true);
    };

    /**
     * Restore avec les données de la bdd
     */
    const onRestorePlanning = () => {
        if (!planningRecipes) return;
        setDaysWeek(formatPlanningWeek(planningRecipes));
        setGeneratedPlanning(false);
    };

    /**
     * Sauvegarde du nouveau planning en base
     */
    const onSavePlanning = () => {
        //const planning = planningGenerated;

        const planning = testJson;
        if (!planning) return;

        mutateSavePlanning({ planning, planningId });
    };

    /**
     * Requete sauvegarde du nouveau planning
     */
    const {
        mutate: mutateSavePlanning,
        /*         data: savePlanning,
        isPending: isPendingSavePlanning,
        isError: isErrorSavePlanning,
        error: errorSavePlanning, */
    } = useSavePlanning();

    /**
     *  Récupère les données de open API
     */
    useEffect(() => {
        if (!planningGenerated) return;
        formatPlanningWeek(planningGenerated);
        setGeneratedPlanning(true);
    }, [planningGenerated]);

    /**
     * Surcharge header
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => <PlanningDetailsHeader name={planningName} handlePlanningGenerate={handlePlanningGenerate} />,
        });
    }, [navigation]);

    if (isLoading || !daysWeek) return <PlanningDetailsSkeleton />;

    if (error) return <LoadingError />;

    return (
        <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
            <ScrollView style={{ ...GlobalStyles.ph, ...styles.scrollView }} contentContainerStyle={styles.scrollViewContainer}>
                <DaysWeekView daysWeek={daysWeek} days={days} />
            </ScrollView>

            {generatedPlanning && (
                <View style={[GlobalStyles.ph, styles.btnsWeek]}>
                    <ButtonCustom title={fr.btnRestore} type="color" onPress={onRestorePlanning} styleButton={{ width: "49%" }} />
                    <ButtonCustom title={fr.btnSave} type="color" onPress={onSavePlanning} styleButton={{ width: "49%" }} />
                </View>
            )}
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollViewContainer: {
        gap: 20,
        paddingVertical: 20,
    },
    btnsWeek: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
    },
});
