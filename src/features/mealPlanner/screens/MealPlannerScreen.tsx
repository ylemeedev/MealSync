import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import TextApp from "../../../shared/components/TextApp";
import { Colors, GlobalStyles } from "../../../assets";
import { Typography } from "../../../assets/fonts";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import ModalCustom from "../../../shared/components/ModalCustom";
import CalendarMealPlanner from "../components/CalendarMealPlanner";
import { useEffect, useLayoutEffect, useState } from "react";
import { SelectedWeekData, MarkedDates } from "../types/mealPlanner.types";
import dayjs from "dayjs";
import { calendarFr, findCurrentWeek } from "../../../shared/helpers/date.helper";
import { DatesBanner } from "../components/DatesBanner";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";
import { HeaderMealPlanner } from "../components/HeaderMealPlanner";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { usePlannings } from "../../shoppingList/hooks/usePlannings";

const daysWeek = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

export const MealPlannerScreen = () => {
    const navigation = useAppNavigation();

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedWeek, setSelectedWeek] = useState<SelectedWeekData>(findCurrentWeek(dayjs(new Date())));

    const positionX = useSharedValue<number>(0);
    const translateX = useSharedValue<number>(0);

    const { data: plannings, isLoading, error } = usePlannings();

    /**
     * Custom header page
     */
    useEffect(() => {
        if (plannings) {
            console.log(
                "plannings >>>>>>>>>>>> ",
                plannings.find((p) => {
                    console.log("weekNumber >>>>>>>>>>>> ", p.weekNumber, selectedWeek.weekOfYear);
                    console.log("year >>>>>>>>>>>> ", p.year, selectedWeek.year);
                    if (p.weekNumber === selectedWeek.weekOfYear && p.year === selectedWeek.year) {
                        return p;
                    }
                }),
            );
        }
    }, [selectedWeek]);

    /**
     * Custom header page
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <HeaderMealPlanner onOpenWeekSelector={() => setIsModalVisible(true)} />,
        });
    }, [navigation]);

    /**
     * Génère la liste des repas
     */
    const handleGenerateList = () => {
        console.log("handleGenerateList");
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
                translateX.value = withTiming(50, { duration: 150 }, () => {
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

    return (
        <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
            <GestureDetector gesture={panGesture}>
                <View style={{ flex: 1 }}>
                    <DatesBanner selectedWeek={selectedWeek} onPrevWeek={onPrevWeek} onNextWeek={onNextWeek} />

                    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
                        <ScrollView style={{ ...GlobalStyles.ph, ...styles.scrollView }} contentContainerStyle={styles.scrollViewContainer}>
                            {daysWeek.map((day, key) => (
                                <View key={key} style={styles.dayContainer}>
                                    <View style={styles.dayHeader}>
                                        <TextApp style={styles.day}>{day}</TextApp>
                                    </View>

                                    <View style={styles.mealContainer}>
                                        <TextApp style={styles.meal}>Matin</TextApp>
                                        <TextApp>Thé</TextApp>
                                        <TextApp>Jus d'orange</TextApp>
                                    </View>

                                    <View style={styles.mealContainer}>
                                        <TextApp style={styles.meal}>Midi</TextApp>
                                        <TextApp>Salade César</TextApp>
                                    </View>

                                    <View style={styles.mealContainer}>
                                        <TextApp style={styles.meal}>Soir</TextApp>
                                        <TextApp>Pizza</TextApp>
                                    </View>
                                </View>
                            ))}

                            <ButtonCustom title="Générer ma liste" type="linear" onPress={handleGenerateList} />
                        </ScrollView>
                    </Animated.View>
                </View>
            </GestureDetector>

            <ModalCustom isModalVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
                <CalendarMealPlanner onValidate={onValidateWeek} week={selectedWeek} />
            </ModalCustom>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        gap: 20,
        paddingVertical: 20,
    },
    scrollView: {
        flex: 1,
    },
    dayContainer: {
        backgroundColor: Colors.white,
        borderRadius: 7,
        overflow: "hidden",
    },
    dayHeader: {
        backgroundColor: Colors.secondaryColor,
        padding: 10,
    },
    day: {
        textTransform: "uppercase",
        fontFamily: Typography.bold,
        color: Colors.mainColor,
        fontSize: 16,
        textAlign: "center",
    },
    mealContainer: {
        padding: 10,
    },
    meal: {
        textTransform: "uppercase",
        fontFamily: Typography.medium,
        fontSize: 16,
    },
});
