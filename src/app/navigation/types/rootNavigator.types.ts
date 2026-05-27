import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootTabParamList = {
    Recipe: undefined;
    PlanningList: undefined;
    Favorite: undefined;
    User: undefined;
};

export type RootStackParamList = {
    Auth: undefined;
    Main: NavigatorScreenParams<RootTabParamList>;
    PlanningDetails: { planningId: number; planningName: string };
    AddPlanning: { weekNumber: number; year: number };
    UserPreference: undefined;
    UserProfil: undefined;
};

export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;

export const useAppNavigation = () => useNavigation<AppNavigation>();
