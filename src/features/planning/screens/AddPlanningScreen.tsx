import { StyleSheet, ScrollView, View, Keyboard } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Colors, GlobalStyles } from "../../../assets";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";
import { PlanningAddHeader } from "../components/PlanningAddHeader";
import { AddPlanningScreenProps, Planning, PlanningWeek } from "../types/planning.types";
import Input from "../../../shared/components/Input";
import { usePlanningGenerator, useSavePlanning } from "../hooks/useGeneratePlanning";
import { formatPlanningWeek } from "../../../shared/helpers/planning.helper";
import { DaysWeek as DaysWeekView } from "../components/DaysWeek";
import { days } from "../../../shared/constants/constants";
import { fr } from "../../../shared/lang/fr";


export const AddPlanningScreen = ({ route }: AddPlanningScreenProps) => {
    const navigation = useAppNavigation();

    const { weekNumber, year } = route.params;

    const [daysWeek, setDaysWeek] = useState<PlanningWeek>();
    const [form, setForm] = useState<Omit<Planning, "id">>({
        weekNumber: weekNumber,
        year: year,
        name: "",
    });

    /**
     * Surcharge header
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => <PlanningAddHeader />,
        });
    }, [navigation]);

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

    const handlePlanningGenerate = () => {
        Keyboard.dismiss();
        mutatePlanningGenerated("vegan");
    };
    
    /**
     *  Récupère les données de open API
     */
    useEffect(() => {
        if (!planningGenerated) return;
        setDaysWeek(formatPlanningWeek(planningGenerated));
    }, [planningGenerated]);

    /**
     * Remise à zéro avec les données de la bdd
     */
    /*     const onResetPlanning = () => {
        if (!planningRecipes) return;
        setDaysWeek();
    }; */

    /**
     * Sauvegarde du nouveau planning en base
     */
    const onSavePlanning = () => {
        const planning = planningGenerated;

        if (!planning || !form.name) return;

        mutateSavePlanning({
            planning,
            planningId: undefined,
            name: form.name,
            weekNumber,
            year,
        });
    };

    /**
     * Requete sauvegarde du nouveau planning
     */
    const {
        mutate: mutateSavePlanning,
        data: savePlanning,
        isPending: isPendingSavePlanning,
        isError: isErrorSavePlanning,
        error: errorSavePlanning,
    } = useSavePlanning();

    /**
     * Si save succes, redirectopn vers la page edition du planning
     */
    useEffect(() => {
        if (savePlanning && savePlanning.success) {
            navigation.replace("PlanningDetails", { planningId: savePlanning.planningId, planningName: form.name });
        }
    }, [savePlanning]);

    return (
        <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
            <View style={{ ...GlobalStyles.ph, ...styles.container }}>
                <View style={styles.formGroup}>
                    <Input
                        value={form.name}
                        autoCorrect={false}
                        placeholder={fr.planning.placeholder.title}
                        onChangeText={(val) => setForm({ ...form, name: val })}
                        style={styles.input}
                    />
                </View>

                {!daysWeek && (
                    <View style={styles.btnsContainer}>
                        <ButtonCustom
                            title={daysWeek ? fr.btnRefreshSchedule : fr.btnGenerateSchedule}
                            onPress={handlePlanningGenerate}
                            type="color"
                            styleButton={styles.btn}
                            disabled={!form.name}
                        />
                    </View>
                )}

                {daysWeek && (
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
                        <DaysWeekView daysWeek={daysWeek} days={days} />
                    </ScrollView>
                )}

                {daysWeek && (
                    <View style={styles.btnsWeek}>
                        <ButtonCustom title={fr.btnRefreshSchedule} onPress={handlePlanningGenerate} type="color" styleButton={{ width: "49%" }} />
                        <ButtonCustom title={fr.btnSave} type="color" onPress={onSavePlanning} styleButton={{ width: "49%" }} />
                    </View>
                )}
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        marginTop: 5,
    },
    btnsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginTop: 20,
    },
    btn: {
        flex: 1,
    },
    registrationDate: {
        paddingVertical: 10,
    },
    formGroup: {
        marginVertical: 10,
    },
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
