import { FlatList, StyleSheet, View } from "react-native";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import { Colors, GlobalStyles } from "../../../assets";
import { Typography } from "../../../assets/fonts";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import ModalCustom from "../../../shared/components/ModalCustom";
import { CalendarMealPlanner } from "../components/CalendarMealPlanner";
import { useLayoutEffect, useMemo, useState } from "react";
import { Planning as PlanningType, SelectedWeekData } from "../types/planning.types";
import dayjs from "dayjs";
import { findCurrentWeek } from "../../../shared/helpers/date.helper";
import { DatesBanner } from "../components/DatesBanner";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";
import { PlanningListHeader } from "../components/PlanningListHeader";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { usePlannings } from "../hooks/usePlannings";
import { Planning } from "../components/Planning";
import { fr } from "../../../shared/lang/fr";
import { LoadingError } from "../../../shared/components/LoadingError";
import { Loading } from "../../../shared/components/Loading";
import PlanningListSkeleton from "../components/skeleton/PlanningListSkeleton";

export const PlanningListScreen = () => {
    const navigation = useAppNavigation();

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedWeek, setSelectedWeek] = useState<SelectedWeekData>(findCurrentWeek(dayjs(new Date())));
    /* const [planningsWeek, setPlanningsWeek] = useState<PlanningType[] | undefined>(); */

    const positionX = useSharedValue<number>(0);
    const translateX = useSharedValue<number>(0);

    const { data: plannings, isLoading, error } = usePlannings();

    /**
     * Selectionne les plannings de la semaine selectionnée
     */
    const planningsWeek = useMemo<PlanningType[]>(() => {
        if (!plannings) return [];

        return plannings.filter((planning) => {
            return planning.weekNumber === selectedWeek.weekOfYear && planning.year === selectedWeek.year;
        });
    }, [plannings, selectedWeek]);

    /**
     * Surcharge header
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <PlanningListHeader onOpenWeekSelector={() => setIsModalVisible(true)} />,
        });
    }, [navigation]);

    /**
     * Génère la liste des repas
     */
    const handleGenerateList = () => {
        console.log("handleGenerateList");
    };

    /**
     * Ouverture du planning
     */
    const onOpenPlanning = (planningId: number, planningName: string) => {
        navigation.navigate("PlanningDetails", { planningId: planningId, planningName: planningName });
    };

    /**
     * Met à jour la semaine sélectionnée après validation du calendrier
     */
    const onValidateWeek = (week?: SelectedWeekData) => {
        setIsModalVisible(false);

        if (week) {
            setSelectedWeek(findCurrentWeek(dayjs(week.startOfWeek)));
        }
    };

    /**
     * Semaine précédente
     */
    const onPrevWeek = () => {
        setSelectedWeek(findCurrentWeek(dayjs(selectedWeek.startOfWeek).subtract(7, "day")));
    };

    /**
     * Semaine suivante
     */
    const onNextWeek = () => {
        setSelectedWeek(findCurrentWeek(dayjs(selectedWeek.startOfWeek).add(7, "day")));
    };

    /**
     * Semaine précédente ou suivante selon le sens du glissé à l'écran
     */
    const panGesture = Gesture.Pan()
        .activeOffsetX([-20, 20])
        .onBegin((e) => {
            positionX.value = e.translationX;
        })
        .onUpdate((e) => {
            translateX.value = e.translationX * 0.3;
        })
        .onEnd((e) => {
            if (e.translationX > 80) {
                translateX.value = withTiming(50, { duration: 150 }, () => {
                    scheduleOnRN(onPrevWeek);
                    translateX.value = withSpring(0);
                });
            } else if (e.translationX < -80) {
                translateX.value = withTiming(-50, { duration: 150 }, () => {
                    scheduleOnRN(onNextWeek);
                    translateX.value = withSpring(0);
                });
            } else {
                translateX.value = withSpring(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));

    const onAddPlanning = () => {
        navigation.navigate("AddPlanning", {
            weekNumber: selectedWeek.weekOfYear,
            year: selectedWeek.year,
        });
    };

    if (isLoading) return <PlanningListSkeleton />;

    if (error) return <LoadingError />;

    return (
        <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
            <GestureDetector gesture={panGesture}>
                <View style={{ flex: 1 }}>
                    <DatesBanner selectedWeek={selectedWeek} onPrevWeek={onPrevWeek} onNextWeek={onNextWeek} />

                    {!planningsWeek ||
                        (planningsWeek.length === 0 && (
                            <View style={[GlobalStyles.ph, styles.generateScheduleContainer]}>
                                <ButtonCustom title={fr.btnAddSchedule} type="color" onPress={onAddPlanning} />
                            </View>
                        ))}

                    {planningsWeek && planningsWeek.length > 0 && (
                        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
                            <FlatList
                                data={planningsWeek}
                                renderItem={({ item }) => <Planning name={item.name} onPress={() => onOpenPlanning(item.id, item.name)} />}
                                keyExtractor={(item) => item.id.toString()}
                            />
                        </Animated.View>
                    )}
                </View>
            </GestureDetector>

            <ModalCustom isModalVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
                <CalendarMealPlanner onValidate={onValidateWeek} week={selectedWeek} />
            </ModalCustom>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    generateScheduleContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    infoText: {
        fontSize: 16,
        fontFamily: Typography.semiBold,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: Colors.danger,
        fontSize: 16,
        fontFamily: Typography.semiBold,
    },
});
