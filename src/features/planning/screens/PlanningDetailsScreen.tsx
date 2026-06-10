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

    const handlePlanningGenerate = () => mutatePlanningGenerated("vegan");


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
        const planning = planningGenerated;

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
