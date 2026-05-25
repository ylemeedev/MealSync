import { StyleSheet, ScrollView, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Colors, GlobalStyles } from "../../../assets";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import TextApp from "../../../shared/components/TextApp";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";
import { HeaderAddPlanning } from "../components/HeaderAddPlanning";
import { AddPlanningScreenProps, Planning, PlanningWeek } from "../types/mealPlanner.types";
import Input from "../../../shared/components/Input";
import { usePlanningGenerator } from "../hooks/useGeneratePlanning";
import { formatPlanningWeek } from "../../../shared/helpers/planning.helper";
import { DaysWeek as DaysWeekView } from "../components/DaysWeek";
import { days } from "../../../shared/constants/constants";
import { fr } from "../../../shared/lang/fr";

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
     * Surcharge du header
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => <HeaderAddPlanning />,
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

   /*  const handlePlanningGenerate = () => mutatePlanningGenerated("vegan"); */

    const handlePlanningGenerate = () => {
        if (!testJson) return;
        formatPlanningWeek(testJson);
    };

    /**
     *  Récupère les données de open API
     */
    useEffect(() => {
        if (!planningGenerated) return;
        setDaysWeek(formatPlanningWeek(planningGenerated));
    }, [planningGenerated]);

    return (
        <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
            <View style={{ ...GlobalStyles.ph, ...styles.container }}>
                <View style={styles.formGroup}>
                    <Input
                        value={form.name}
                        autoCorrect={false}
                        placeholder={fr.placeholderTitlePlanning}
                        onChangeText={(val) => setForm({ ...form, name: val })}
                        style={styles.input}
                    />
                </View>

                <View style={styles.btnsContainer}>
                    <ButtonCustom title={fr.btnGenerateSchedule} onPress={handlePlanningGenerate} type="color" styleButton={styles.btn} disabled={!form.name} />
                </View>

                {daysWeek && (
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
                        <DaysWeekView daysWeek={daysWeek} days={days} />
                    </ScrollView>
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
});
